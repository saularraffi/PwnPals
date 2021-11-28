const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')
const axios = require('axios')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

// const dockerfile = fs.readFileSync(`${__dirname}/dockerFileTest`, {encoding:'utf8', flag:'r'}) 
// const regex = /d[E|e][X|x][P|p][O|o][S|s][E|e] [0-9]*/g;
// const found = dockerfile.match(regex);
// console.log(found)
// console.log(found[0].split(' ')[1])

async function createContainer(imageName) {
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

function deleteContainer() {
    docker.container.list({
        all: true
    })
    .then(containers => {
        return containers[0]
    })
    .then(container => container.delete())
    .then(res => console.log(res))
    .catch(error => console.log(error));
}

// createContainer('saular-testapp')
deleteContainer()