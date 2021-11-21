const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.list({'all': true})
.then(containers => {
    containers.map(c => {
        if (c.data.Image === 'testapp') {
            c.stop()
        }
    })
})
.catch(error => console.log(error));