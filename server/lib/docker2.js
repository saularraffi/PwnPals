const { Docker } = require('node-docker-api')
const { spawnProcess } = require('./spawnProcess')
const tar = require('tar-fs')
const path = require('path')
const fs = require('fs');


const docker = new Docker({ socketPath: '/var/run/docker.sock' })

function containerHelper(action, containerId) {
    docker.container.list()
    .then(containers => {
        containers.map(c => {
            if (c.data.Id.substring(0,12) === containerId) {
                if (action === 'start') {
                    c.start()
                }
                else if (action === 'stop') {
                    c.stop()
                }
                else if (action === 'delete') {
                    c.delete()
                }
            }
        })
    })
    .catch(error => console.log(error));
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
    
    docker.image.build(tarStream, {
        t: imageName
    })
    .then(stream => promisifyStream(stream))
    .then(() => docker.image.get(imageName).status())
    .then(status => {
        return status.data.Config.Image.split(':')[1]
    })
    .then(() => {
        fs.rmdir(path.join(cloneDir, '..'), { recursive: true, force: true }, (err) => {
            if (err) {
                throw err;
            }
        });
    })
    .catch(error => {
        console.log(error)
        return null
    });
}

exports.deleteImage = function(imageId) {
    docker.image.list()
    .then(containers => {
        containers.map(c => {
            if (c.data.Id.split(':')[1].substring(0,12) === imageId) {
                c.remove()
            }
        })
    })
}

exports.createContainer = function(imageName) {
    docker.container.create({
        Image: imageName,
        name: imageName,
        ExposedPorts: { '8080/tcp': {} },
        NetworkConfig: {'NetworkMode': 'host'}
    })
    .then(container => container.start())
    .catch(error => console.log(error));
}

exports.startContainer = function(containerId) {
    containerHelper('start', containerId)
}

exports.stopContainer = function(containerId) {
    containerHelper('stop', containerId)
}

exports.deleteContainer = function(containerId) {
    containerHelper('delete', containerId)
}