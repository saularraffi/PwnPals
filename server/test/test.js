const { spawn, spawnSync, execSync } = require('child_process');
const { Docker } = require('node-docker-api')
const dockerLib = require('../lib/docker2')
const tar = require('tar-fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

const imageName = 'testimg'

const promisifyStream = stream => new Promise((resolve, reject) => {
    stream.on('data', data => console.log(data.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
});

const tarStream = tar.pack('/home/saular/Repos/test-app')

docker.image.build(tarStream, {
    t: imageName
})
.then(stream => promisifyStream(stream))
.then(() => docker.image.get(imageName).status())
.catch(error => console.log(error));