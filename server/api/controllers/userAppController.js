const UserApp = require("../models/UserApp")
const docker = require("../../lib/docker.js")

exports.getUserApp = function(req, res) {
    const id = req.query.id

    UserApp.findById(id, function(err, userApp) {
        if (err) { 
            console.log(err) 
            res.send("Failed to get user's app")
        }
        else {
            res.json(userApp)
        }
    })
}

exports.getAllUserApps = function(req, res) {
    const userId = req.query.userId
    
    UserApp.find({ userId: userId }, function(err, userApp) {
        if (err) { 
            console.log(err) 
            res.send("Failed to get user's apps")
        }
        else {
            res.json(userApp)
        }
    })      
}

exports.getSearchedUserApps = function(req, res) {
    const search = req.query.search

    const r = new RegExp(search, 'i');

    UserApp.find({ appName: { $regex: r, $options: 'i' }}, function(err, userApps) {
        if (err) {
            console.log(err)
            res.send("Failed to find user apps")
        }
        else {
            res.send(userApps) 
        }
    })
}

exports.createUserApp = async function(req, res) {
    const userId = req.session.user.id
    const username = req.session.user.username
    const repo = req.body.repo
    const appName = req.body.appName
    const description = req.body.description

    console.log("\n[+] Building Image...")

    res.send("Creating user app")

    const id = await docker.buildImage(appName, repo)

    if (id !== null) {
        const userApp = new UserApp({ 
            userId: userId,
            username: username,
            repo: repo,
            appName: appName,
            created: Date.now(),
            imageId: id,
            description: description,
            status: "exited",
            port: null,
            containerId: null,
        })
        userApp.save(function(err) {
            if (err) {
                console.log("\n[-] Failed to save user app")
                console.log(err)
            }
            else {
                console.log("\n[+] Successfully saved user app")
            }
        })
    }
}

exports.startUserApp = async function(req, res) {
    const mongoId = req.body.mongoId
    // const containerId = req.body.containerId
    const appName = req.body.appName

    // const status = await docker.startContainer(containerId)
    const status = await docker.createContainer(appName)

    const data = status.data.HostConfig.PortBindings
    const exposedPortKey = Object.keys(data)[0]
    const exposedPort = data[exposedPortKey][0].HostPort

    if (status !== undefined || status !== null) {
        UserApp.findOneAndUpdate({ _id: mongoId }, {
            status: "running", port: exposedPort, containerId: status.data.Id
        }, (err, userApp) => {
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

exports.stopUserApp = async function(req, res) {
    const mongoId = req.body.mongoId
    const containerId = req.body.containerId

    const status = await docker.deleteContainer(containerId)

    if (status !== undefined || status !== null) {
        UserApp.findOneAndUpdate({ _id: mongoId }, {
            status: "exited", port: null, containerId: null
        }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send("Error stopping container")
            }
            else {
                console.log("\n[+] Container deleted successfully")
                res.send("Stopping container")
            }
        })
    }
    else {
        console.log("\n[-] Container failed to stop")
        res.send("Error deleting container")
    }
}

exports.deleteUserApp = async function(req, res) {
    const imageId = req.body.imageId

    console.log("\n[+] Deleting image...")

    const status = await docker.deleteImage(imageId)

    if (status !== undefined || status !== null) {
        UserApp.findOneAndDelete({ imageId: imageId }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send("Failed to delete user app")
            }
            else {
                console.log("\n[+] Successfully deleted user app")
                res.send("Successfully deleted user app")
            }
        })
    }
    else {
        console.log("\n[-] Failed to delete user app")
        res.send("Failed to delete user app")
    }
}