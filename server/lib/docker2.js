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

exports.buildImage = function(imageName, repo) {
    const repoOwner = repo.split('/')[3]
    const repoName = repo.split('/')[4].split('.')[0]
    const cloneDir = path.join('/', 'tmp', 'pwnpals', repoOwner, repoName)
    // const dockerContextPath = path.join('/', 'tmp', 'pwnpals', repoOwner, repoName)

    if (!fs.existsSync(cloneDir)){
        fs.mkdirSync(cloneDir, { recursive: true });
    }

    // const cloneResult = spawnProcess('git', ['clone', repo], { cwd: cloneDir })
    spawnProcess('git', ['clone', repo, cloneDir])
    .then(res => {
        console.log(res)

        if (res.status != 0) {
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
        .catch(error => console.log(error));

        // fs.rmdir(cloneDir, { recursive: true, force: true }, (err) => {
        //     if (err) {
        //         throw err;
        //     }
        // });

        return true
    })
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

// exports.test = function() {
//     console.log(path.join(__dirname, '..', 'scripts', 'cloneRepo.sh'))
// }