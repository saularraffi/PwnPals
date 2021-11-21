const { Docker } = require('node-docker-api')
const tar = require('tar-fs');

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

exports.buildImage = function(imageName, dockerContextPath) {
    const promisifyStream = stream => new Promise((resolve, reject) => {
        stream.on('data', data => console.log(data.toString()))
        stream.on('end', resolve)
        stream.on('error', reject)
    });
    
    // /home/saular/Repos/test-app
    const tarStream = tar.pack(dockerContextPath)
    
    docker.image.build(tarStream, {
        t: imageName
    })
    .then(stream => promisifyStream(stream))
    .then(() => docker.image.get(imageName).status())
    .catch(error => console.log(error));
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

exports.createContainer = function(containerId) {
    return
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