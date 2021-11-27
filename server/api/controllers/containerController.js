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
    const imageName = req.body.imageName

    res.send("Creating container")

    const stats = await docker.createContainer(imageName)

    if (stats !== null) {
        const container = new Container({ 
            user: user,
            imageId: stats.data.Image.split(':')[1],
            imageName: imageName,
            containerId: stats.data.Id,
            port: 80,
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

    // use the returned status to update db

    Container.findOneAndUpdate({ containerId: containerId }, { status: "running" }, (err, doc) => {
        if (err) {
            console.log(err)
        }
    })

    res.send("Starting container")
}

exports.stopContainer = function(req, res) {
    const containerId = req.body.containerId

    const status = docker.stopContainer(containerId)

    // use the returned status to update db

    Container.findOneAndUpdate({ containerId: containerId }, { status: "exited" }, (err, doc) => {
        if (err) {
            console.log(err)
        }
    })

    // get rid of this line after conforming dvwa appId field to containerId in db
    Container.findOneAndUpdate({ appId: containerId }, { status: "exited" }, (err, doc) => {
        if (err) {
            console.log(err)
        }
    })

    res.send("Stopping container")
}

exports.deleteContainer = function(req, res) {
    const containerId = req.body.containerId

    const status = docker.deleteContainer(containerId)

    res.send("Deleting container")
}