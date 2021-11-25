const Container = require("../models/Container")
const docker = require("../../lib/docker.js")
const docker2 = require("../../lib/docker2.js")
const axios = require('axios')

function getContainer(req, res) {
    Container.find({}, function(err, containers) {
        console.log(containers)

        if (err) { 
            console.log(err) 
            res.send("Failed to get containers")
        }
        else {
            res.json(containers)
        }
    })
}

async function runContainer(req, res) {
    const imageName = req.body.imageName

    docker2.createContainer(imageName)

    res.send("Running container")
}

function startContainer(req, res) {
    const imageName = req.body.imageName

    docker2.startContainer(imageName)

    res.send("Starting container")
}

function stopContainer(req, res) {
    const containerId = req.body.containerId

    console.log(containerId)

    res.send("Stopping container")
}

function deleteContainer(req, res) {
    const imageName = req.body.imageName

    const status_code = docker.delete_container(imageName)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to delete container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    Container.deleteMany({ imageName: imageName })
    .then(function() {
        console.log("\n[+] Container deleted successfully"); // Success
    })
    .catch(function(error){
        console.log(error); // Failure
    });

    res.send("DELETE container")
}

module.exports.getContainer = getContainer
module.exports.runContainer = runContainer
module.exports.startContainer = startContainer
module.exports.stopContainer = stopContainer
module.exports.deleteContainer = deleteContainer