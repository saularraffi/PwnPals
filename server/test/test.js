const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.list({
    all: true
})
   // Inspect
  .then(containers => containers[0].status())
  .then(container => container.top())
  .then(processes => console.log(processes))
  .catch(error => console.log(error));