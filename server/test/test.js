const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')
const axios = require('axios');
const path = require('path/posix');

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

const containers = ['one', 'two', 'three', 'four', 'five']
const containerId = 'two'

function test() {
  containers.map(c => {
    if (c === containerId) {
        return "found"
    }
  })  
}

function test2() {
  for (const c of containers) {
    if (c === containerId) {
      return 'found'
    }
  }
}

// test().then(res => console.log(res))
console.log(test2())
