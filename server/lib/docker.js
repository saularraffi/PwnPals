const { Docker } = require('node-docker-api')
const { spawnProcess } = require('./spawnProcess')
const tar = require('tar-fs')
const path = require('path')
const fs = require('fs');
const portfinder = require('portfinder');

const docker = new Docker({ socketPath: '/var/run/docker.sock' })


exports.buildImage = async function(imageName, repo) {
    const repoOwner = repo.split('/')[3]
    const repoName = repo.split('/')[4].split('.')[0]
    const cloneDir = path.join('/', 'tmp', 'pwnpals', repoOwner, repoName)

    if (!fs.existsSync(cloneDir)){
        fs.mkdirSync(cloneDir, { recursive: true });
    }
    else {
        fs.rmdirSync(cloneDir, { recursive: true, force: true }, (err) => {
            if (err) {
                throw error
            }
        });
    }

    const cloneResult = await spawnProcess('git', ['clone', repo, cloneDir])
    
    console.log(cloneResult)

    if (cloneResult.status != 0) {
        console.log('\n[+] Error cloning repo')
        return false
    }

    const promisifyStream = stream => new Promise((resolve, reject) => {
        stream.on('data', data => console.log(data.toString()))
        stream.on('end', resolve)
        stream.on('error', reject)
    });
    
    const tarStream = tar.pack(cloneDir)
    
    return docker.image.build(tarStream, {
        t: imageName,
        networkmode: 'host'
    })
    .then(stream => promisifyStream(stream))
    .then(() => {
        return docker.image.get(imageName).status()
    })
    .then(status => {
        console.log('\n[+] Stream has ended')
        const id = status.data.Id.split(':')[1]
        const dockerExposedPort = Object.keys(status.data.ContainerConfig.ExposedPorts)[0]
        return { id: id, dockerExposedPort: dockerExposedPort }
    })
    .then(id => {        
        fs.rm(path.join(cloneDir, '..'), { recursive: true, force: true }, (err) => {
            if (err) {
                throw err;
            }
        });
        return id
    })
    .catch(error => {
        console.log(error)
        return null
    });
}

exports.deleteImage = async function(imageId) {
    return docker.image.list()
    .then(async (images) => {
        return await Promise.all(images.map(i => {
            if (i.data.Id.split(':')[1] === imageId) {
                console.log("found image")
                return i.remove()
            }
        }))
    })
}

exports.createContainer = async function(appName, dockerExposedPort) {
    return portfinder.getPortPromise()
    .then(portFound => {
        const exposedPort = portFound

        console.log(`\nport found - ${portFound}\n`)

        return docker.container.create({
            Image: appName,
            name: appName,
            HostConfig: {
                PortBindings: { [dockerExposedPort]: [{ "HostPort": `${exposedPort}` }]}
            }
        })
        .then(container => {
            return container.start()
        })
        .then(container => { return container.status() })
        .catch(error => {
            console.log(error)
            return null
        });
    })
    .catch(err => console.log(err));
}

exports.deleteContainer = async function(containerId) {
    return docker.container.list({
        all: true
    })
    .then(async (containers) => {
        return await Promise.all(containers.map(container => {
            if (container.data.Id === containerId) {
                return container.delete({ force: true })
            }
        }))
    })
    .catch(error => {
        console.log(error)
        return null
    });
}