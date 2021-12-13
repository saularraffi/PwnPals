const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')
const axios = require('axios');
const path = require('path/posix');

// const docker = new Docker({ socketPath: '/var/run/docker.sock' }) 
const docker = new Docker({ socketPath: 'tcp://0.0.0.0:2376' });
 
// List
docker.container.list()
   // Inspect
  .then(containers => containers[0].status())
  .then(container => container.top())
  .then(processes => console.log(processes))
  .catch(error => console.log(error));