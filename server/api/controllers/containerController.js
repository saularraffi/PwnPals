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
    const imageName = req.body.imageName
    const port = req.body.port

    const run_result = docker.run_container(imageName, 8080, port)
    const status_code = run_result.status

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to run container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    // for (const key in run_result.container_info.HostConfig.PortBindings) {
    //     const port = String(key).split("/")[0]
    //     break
    // }

    const container = new Container({ 
        owner: owner,
        imageName: imageName,
        appID: run_result.container_info.Id,
        port: port,
        created: run_result.container_info.Created,
        status: run_result.container_info.State.Status
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
    const imageName = req.body.imageName

    const status_code = docker.start_container(imageName)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to start container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    res.send("Starting container")
}

function stopContainer(req, res) {
    const imageName = req.body.imageName

    const status_code = docker.stop_container(imageName)
    
    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to stop container")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    res.send("Stopping container")
}

function deleteContainer(req, res) {
    const imageName = req.body.imageName
    const _id = req.body._id

    const status_code = docker.delete_container(imageName)

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
        else if (doc) {
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