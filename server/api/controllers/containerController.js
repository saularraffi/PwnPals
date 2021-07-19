const Container = require("../../models/Container")

function getContainer(req, res) {
    res.send("GET container")
}

function postContainer(req, res) {
    const owner = "user123"
    const repo = "https://github.com/saularraffi/test-app.git"
    const branch = "main"
    const appName = "testApp" 

    const container = new Container({ 
        owner: owner,
        repo: repo,
        branch: branch,
        appName: appName
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