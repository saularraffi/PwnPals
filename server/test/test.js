const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')
const axios = require('axios')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.list()
   // Inspect
  .then(containers => containers[0].status())
  .then(container => container.stats())
  .then(stats => {
    stats.on('data', stat => console.log('Stats: ', stat.toString()))
    stats.on('error', err => console.log('Error: ', err))
  })
  .catch(error => console.log(error));