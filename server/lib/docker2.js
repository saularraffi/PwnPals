const { Docker } = require('node-docker-api')
const tar = require('tar-fs');

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

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

exports.deleteImage = function(imageName) {
    docker.image.list()
    .then(containers => {
        containers.map(c => {
            if (c.data.RepoTags[0].split(':')[0] === imageName) {
                c.remove()
            }
        })
    })
}

exports.startContainer = function(imageName) {
    docker.container.list({'all': true})
    .then(containers => {
        containers.map(c => {
            if (c.data.Image === imageName) {
                c.start()
            }
        })
    })
    .catch(error => console.log(error));
}

exports.stopContainer = function(imageName) {
    docker.container.list({'all': true})
    .then(containers => {
        containers.map(c => {
            if (c.data.Image === imageName) {
                c.stop()
            }
        })
    })
    .catch(error => console.log(error));
}

exports.deleteContainer = function(imageName) {
    docker.container.list({'all': true})
    .then(containers => {
        containers.map(c => {
            if (c.data.Image === imageName) {
                c.delete()
            }
        })
    })
    .catch(error => console.log(error));
}