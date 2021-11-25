const Container = require("../models/Container")
const docker = require("../../lib/docker.js")


exports.getContainer = function(req, res) {
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

exports.createContainer = async function(req, res) {
    const imageName = req.body.imageName

    docker.createContainer(imageName)

    res.send("Running container")
}

exports.startContainer = function(req, res) {
    const imageName = req.body.imageName

    docker.startContainer(imageName)

    res.send("Starting container")
}

exports.stopContainer = function(req, res) {
    const containerId = req.body.containerId

    console.log(containerId)

    res.send("Stopping container")
}

exports.deleteContainer = function(req, res) {
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