const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

const dockerfile = fs.readFileSync(`${__dirname}/dockerFileTest`, {encoding:'utf8', flag:'r'}) 
const regex = /d[E|e][X|x][P|p][O|o][S|s][E|e] [0-9]*/g;
const found = dockerfile.match(regex);
console.log(found)
console.log(found[0].split(' ')[1])
