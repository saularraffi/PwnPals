const Container = require("../models/Container")
const Build = require("../models/Build")
const docker = require("../../lib/docker.js")


exports.getContainer = function(req, res) {
    const id = req.query.id

    Container.findById(id, function(err, container) {
        if (err) { 
            console.log(err) 
            res.send("Failed to get container")
        }
        else {
            res.json(container)
        }
    })
}

exports.getContainers = function(req, res) {
    Container.find({}, function(err, containers) {
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

    console.log("\n[+] Creating container")
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

exports.startContainer = async function(req, res) {
    const containerId = req.body.containerId

    const status = await docker.startContainer(containerId)

    if (status !== null) {
        Container.findOneAndUpdate({ containerId: containerId }, { status: "running" }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send("Error starting container")
            }
            else {
                console.log("\n[+] Container started successfully")
                res.send("Starting container")
            }
        })
    }
    else {
        res.send("Error starting container")
    }
}

exports.stopContainer = async function(req, res) {
    const containerId = req.body.containerId

    const status = await docker.stopContainer(containerId)

    if (status !== null) {
        Container.findOneAndUpdate({ containerId: containerId }, { status: "exited" }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send("Error stopping container")
            }
            else {
                console.log("\n[+] Container stopped successfully")
                res.send("Stopping container")
            }
        })
    }
    else {
        res.send("Error stopping container")
    }
}

exports.deleteContainer = async function(req, res) {
    const containerId = req.body.containerId

    await docker.deleteContainer(containerId) 

    Container.findOneAndDelete({ containerId: containerId }, (err, doc) => {
        if (err) {
            console.log(err)
            res.send("Container failed to delete")
        }
        else {
            console.log("\n[+] Container deleted successfully")
            res.send("Container deleted successfully")

            Build.findOneAndDelete({ imageId: doc.imageId }, (err, doc) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("\n[+] Image deleted successfully")
                }
            })
        }
    })
}