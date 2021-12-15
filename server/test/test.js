const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker')
const { spawnProcess } = require('../lib/spawnProcess')
const tar = require('tar-fs')
const fs = require('fs')
const axios = require('axios');
const path = require('path/posix');

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

var myDate = "26-02-2013";
myDate = myDate.split("-");
var newDate = new Date('2021-12-13T16:43:01.056Z')

var myDate = "26-02-2012";
myDate = myDate.split("-");
var newDate2 = new Date('2022-12-13T16:43:01.056Z')

console.log(newDate > newDate2)