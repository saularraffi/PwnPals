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
    const userId = req.query.userId

    Container.find({ userId: userId }, function(err, containers) {
        if (err) { 
            console.log(err) 
            res.send("Failed to get containers")
        }
        else {
            res.json(containers)
        }
    })      
}

exports.getSearchedContainers = function(req, res) {
    const search = req.query.search

    const r = new RegExp(search, 'i');

    Container.find({ imageName: { $regex: r, $options: 'i' }}, function(err, containers) {
        if (err) {
            console.log(err)
            res.send("Failed to find containers")
        }
        else {
            res.send(containers) 
        }
    })
}

exports.createContainer = async function(req, res) {
    const userId = req.body.userId
    const username = req.body.username
    const imageName = req.body.imageName
    const description = req.body.description

    console.log("\n[+] Creating container")
    res.send("Creating container")

    const stats = await docker.createContainer(imageName)

    if (stats !== null) {
        const container = new Container({ 
            userId: userId,
            username: username,
            imageId: stats.data.Image.split(':')[1],
            imageName: imageName,
            containerId: stats.data.Id,
            port: 80,
            status: stats.data.State.Status,
            description: description,
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
    const mongoId = req.body.mongoId
    const containerId = req.body.containerId

    const status = await docker.startContainer(containerId)

    console.log(status)

    if (status !== undefined || status !== null) {
        Container.findOneAndUpdate({ _id: mongoId }, { status: "running" }, (err, doc) => {
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
        console.log("\n[-] Container failed to start")
        res.send("Error starting container")
    }
}

exports.stopContainer = async function(req, res) {
    const mongoId = req.body.mongoId
    const containerId = req.body.containerId

    const status = await docker.stopContainer(containerId)

    if (status !== undefined || status !== null) {
        Container.findOneAndUpdate({ _id: mongoId }, { status: "exited" }, (err, doc) => {
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
        console.log("\n[-] Container failed to stop")
        res.send("Error stopping container")
    }
}

exports.deleteContainer = async function(req, res) {
    const mongoId = req.body.mongoId
    const containerId = req.body.containerId

    const status = await docker.deleteContainer(containerId) 

    if (status !== undefined || status !== null) {
        Container.findOneAndDelete({ _id: mongoId }, (err, doc) => {
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
    else {
        console.log("\n[-] Container failed to delete")
        res.send("Container failed to delete")
    }
}