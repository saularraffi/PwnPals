const { Docker } = require('node-docker-api')
const { spawnProcess } = require('./spawnProcess')
const tar = require('tar-fs')
const path = require('path')
const fs = require('fs');


const docker = new Docker({ socketPath: '/var/run/docker.sock' })

async function containerHelper(action, containerId) {
    let listAll = true
    if (action === 'stop') {
        listAll = false
    }

    return docker.container.list({
        all: listAll
    })
    .then(async (containers) => {
        for (const c of containers) {
            if (c.data.Id === containerId) {
                if (action === 'start') {
                    return c.start()
                }
                else if (action === 'stop') {
                    return c.stop()
                }
                else if (action === 'delete') {
                    return c.delete({ force: true })
                }
            }
        }
    })
    .catch(error => {
        console.log(error)
        return null
    });
}

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
        return status.data.Id.split(':')[1]
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

exports.createContainer = async function(imageName) {
    const port = 80
    const exposedPort = `${port}/tcp`

    return docker.container.create({
        Image: imageName,
        name: imageName,
        ExposedPorts: { exposedPort: {} },
        HostConfig: {
            NetworkMode: 'host'
        }
    })
    .then(container => { return container.start() })
    .then(container => { return container.stop() })
    .then(container => { return container.status() })
    .catch(error => {
        console.log(error)
        return null
    });
}

exports.startContainer = function(containerId) {
    return containerHelper('start', containerId)
}

exports.stopContainer = function(containerId) {
    return containerHelper('stop', containerId)
}

exports.deleteContainer = function(containerId) {
    return containerHelper('delete', containerId)
}