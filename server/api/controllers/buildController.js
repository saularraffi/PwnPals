const Build = require("../models/Build")
const docker = require("../../lib/docker.js")

function getBuild(req, res) {
    Build.find({}, function(err, builds) {
        console.log(builds)

        if (err) { 
            console.log(err) 
            res.send("Failed to get builds")
        }
        else {
            res.json(builds)
        }
    })
}

function postBuild(req, res) {
    const owner = req.body.owner
    const repo = req.body.repo
    const branch = req.body.branch
    const imageName = req.body.imageName

    // can't access return value because process is async
    const status_code = docker.build_image(repo, branch, imageName)  

    // save to database
    if (true) {
        const build = new Build({ 
            owner: owner,
            repo: repo,
            branch: branch,
            imageName: imageName
        })
        build.save(function(err) {
            if (err) { 
                console.log(err)
                res.send("Failed to save build to database")
            }
            else {
                res.send(req.body)
            }
        })
    }
    else {
        res.send("Failed to build image")
    }
}

function deleteBuild(req, res) {
    const imageName = req.body.imageName
    const _id = req.body._id

    const status_code = docker.destroy_image(imageName)

    Build.findOneAndDelete(_id, (err, doc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(doc)
        }
    })

    res.send("DELETE build")
}

module.exports.getBuild = getBuild
module.exports.postBuild = postBuild
module.exports.deleteBuild = deleteBuild