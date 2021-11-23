const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker2')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

function testA() {
    return "hello"
}

async function testB() {
    return "hello"
}

testB()
.then(res => {
    console.log(res)
})