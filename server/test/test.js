const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker2')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

// 9445284c5e076cd40757352022075bfbfb5d64d0c211b38f5e12261f0fe30352

docker.container.create({
    Image: 'testapp',
    name: 'testapp'
})
.then(container => container.start())
// .then(container => container.stop())
// .then(container => container.restart())
// .then(container => container.delete({ force: true }))
.catch(error => console.log(error));