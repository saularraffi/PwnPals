const Container = require("../models/Container")
const docker = require("../../lib/docker.js")

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

function runContainer(req, res) {
    const owner = req.body.owner
    const appName = req.body.appName
    const appID = req.body.appID
    const status = req.body.status

    const status_code = docker.run_container(appName, 8080, 8080)

    res.send("Running container")
}

function startContainer(req, res) {
    const id = req.body.id

    const status_code = docker.start_container(id)

    res.send("Starting container")
}

function stopContainer(req, res) {
    const id = req.body.id

    const status_code = docker.stop_container(id)

    res.send("Stopping container")
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
module.exports.runContainer = runContainer
module.exports.startContainer = startContainer
module.exports.stopContainer = stopContainer
module.exports.updateContainer = updateContainer
module.exports.deleteContainer = deleteContainer