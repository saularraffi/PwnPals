const Container = require("../../models/Container")

function getContainer(req, res) {
    res.send("GET container")
}

function postContainer(req, res) {
    const owner = "user123"
    const appName = "testApp"
    const appID = "43c2f7354ff5"
    const status = "down"

    const container = new Container({ 
        owner: owner,
        appName: appName,
        appID: appID,
        status: status
    })
    container.save(function(err) {
        if (err) { 
            console.log(err)
            res.send("POST failed")
        }
        else {
            res.send("POST success")
        }
    })
}

function updateContainer(req, res) {
    res.send("PUT container")
}

function deleteContainer(req, res) {
    res.send("DELETE container")
}

module.exports.getContainer = getContainer
module.exports.postContainer = postContainer
module.exports.updateContainer = updateContainer
module.exports.deleteContainer = deleteContainer