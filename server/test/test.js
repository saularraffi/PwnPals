const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.image.list()
.then(containers => {
    containers.map(c => {
        if (c.data.Id.split(':')[1].substring(0,12) === imageId) {
            c.remove()
        }
    })
})