const Container = require("../models/Container")
const docker = require("../../lib/docker.js")
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

function runContainer(req, res) {
    const owner = req.body.owner
    const appName = req.body.appName
    const appID = req.body.appID
    const port = req.body.port
    const status = req.body.status

    const status_code = docker.run_container(appName, 8080, port)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to run container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    const container = new Container({ 
        owner: owner,
        appName: appName,
        appID: appID,
        port: port,
        status: status
    })
    container.save(function(err) {
        if (err) { 
            console.log(err)
            res.send("Failed to save container to database")
        }
        else {
            res.json(req.body)
        }
    })
}

function startContainer(req, res) {
    const id = req.body.id

    const status_code = docker.start_container(id)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to start container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    res.send("Starting container")
}

function stopContainer(req, res) {
    const id = req.body.id

    const status_code = docker.stop_container(id)
    
    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to stop container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    res.send("Stopping container")
}

function deleteContainer(req, res) {
    const id = req.body.id
    const _id = req.body._id

    const status_code = docker.delete_container(id)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to delete container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    Container.findOneAndDelete(_id, (err, doc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("\n")
            console.log(doc)
        }
    })

    res.send("DELETE container")
}

module.exports.getContainer = getContainer
module.exports.runContainer = runContainer
module.exports.startContainer = startContainer
module.exports.stopContainer = stopContainer
module.exports.deleteContainer = deleteContainer