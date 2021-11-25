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
    const user = req.body.user
    const imageId = req.body.user
    const imageName = req.body.imageName
    const port = req.body.port

    res.send("Creating container")

    const stats = await docker.createContainer(imageName)

    if (stats !== null) {
        const container = new Container({ 
            user: user,
            imageId: stats.data.Image.split(':')[1],
            imageName: imageName,
            appId: stats.data.Id,
            port: port,
            status: stats.data.State.Status,
            created: Date.now(),
        })
        container.save(function(err) {
            if (err) {
                console.log("\n[-] Container failed to save")
                console.log(err)
            }
            else {
                console.log("\n[+] Container saved successfully")
            }
        })
    }
}

exports.startContainer = function(req, res) {
    const containerId = req.body.containerId

    const status = docker.startContainer(containerId)

    res.send("Starting container")
}

exports.stopContainer = function(req, res) {
    const containerId = req.body.containerId

    res.send("Stopping container")

    const status = docker.stopContainer(containerId)
}

exports.deleteContainer = function(req, res) {
    const containerId = req.body.containerId

    res.send("Deleting container")

    const status = docker.deleteContainer(containerId)
}