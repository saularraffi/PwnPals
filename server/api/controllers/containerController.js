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

async function runContainer(req, res) {
    const owner = req.body.owner
    const imageName = req.body.imageName
    const external_port = req.body.port

    console.log("\n[+] Running container...")

    const run_result = docker.run_container(imageName, 80, external_port)
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

    // remove any previous containers(s) from database
    await Container.deleteMany({ imageName: imageName })
    .then(function() {
        console.log("Previous container(s) deleted"); // Success
    })
    .catch(function(error) {
        console.log(error); // Failure
    });

    const container = new Container({ 
        owner: owner,
        imageName: imageName,
        appID: run_result.container_info.Id,
        port: port,
        created: run_result.container_info.Created,
        status: (run_result.container_info.State.Status === "running" ? "up" : "down")
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

    const start_result = docker.start_container(imageName)
    const status_code = start_result.status

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to start container")
        return
    }

    Container.findOneAndUpdate({ imageName: imageName }, 
        {status: (start_result.container_info.State.Status === "running" ? "up" : "down")}, (err, doc) => {
        if (err) {
            console.log("\n[+] Failed to update container in database")
            res.send("Container started but database function failed")
            return
        }
    });

    console.log(`\n[+] Process exited with status code ${status_code}`)

    res.send("Starting container")
}

function stopContainer(req, res) {
    const imageName = req.body.imageName

    const stop_result = docker.stop_container(imageName)
    const status_code = stop_result.status
    
    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to stop container")
        return
    }

    Container.findOneAndUpdate({ imageName: imageName }, 
        {status: (stop_result.container_info.State.Status === "running" ? "up" : "down")}, (err, doc) => {
        if (err) {
            console.log("\n[+] Failed to update container in database")
            res.send("Container stopped but database function failed")
            return
        }
    });

    console.log(`\n[+] Process exited with status code ${status_code}`)

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