const Container = require("../models/Container")
const { spawn } = require('child_process');

function delete_container(id) {
    console.log(`deleting ${id}`)
    const build = spawn('sudo', ["docker", "rm", id]);

    build.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    build.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    build.on('error', (err) => {
        console.log(err)
    })

    build.on('close', (code) => {
        console.log(`[+] child process exited with code ${code}`);
    });
}

function getContainer(req, res) {
    res.send("GET container")
}

function postContainer(req, res) {
    const owner = req.body.owner
    const appName = req.body.appName
    const appID = req.body.appID
    const status = req.body.status

    const container = new Container({ 
        owner: owner,
        appName: appName,
        appID: appID,
        status: status
    })
    container.save(function(err) {
        if (err) { 
            console.log(err)
            res.send("POST failed")
        }
        else {
            res.json(req.body)
        }
    })
}

function updateContainer(req, res) {
    const owner = req.body.owner
    const appName = req.body.appName
    const appID = req.body.appID
    const status = req.body.status

    res.json(req.body)
}

function deleteContainer(req, res) {
    const id = req.body.id
    const status_code = delete_container(id)
    res.send("DELETE container")
}

module.exports.getContainer = getContainer
module.exports.postContainer = postContainer
module.exports.updateContainer = updateContainer
module.exports.deleteContainer = deleteContainer