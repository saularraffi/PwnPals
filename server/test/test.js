const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker2')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

// 9445284c5e076cd40757352022075bfbfb5d64d0c211b38f5e12261f0fe30352

docker.container.create({
    Image: 'testapp',
    name: 'testapp',
    ExposedPorts: { '8080/tcp': {} },
    NetworkConfig: {'NetworkMode': 'host'}
})
.then(container => container.start())
.catch(error => console.log(error));