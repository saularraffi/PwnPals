const Build = require("../models/Build")
const docker = require("../../lib/docker.js")
const axios = require("axios")


exports.getBuild = function(req, res) {
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

exports.getAllBuilds = function(req, res) {
    const { id } = req.query

    Build.findById(id, function(err, build) {
        console.log(builds)

        if (err) { 
            console.log(err)
            res.send("Failed to get build")
        }
        else {
            res.json(build)
        }
    })
}

exports.postBuild = async function(req, res) {
    const userId = req.session.user.id
    const username = req.session.user.username
    const repo = req.body.repo
    const imageName = req.body.imageName
    const description = req.body.description

    console.log("\n[+] Building Image...")

    res.send("Building image...")

    const id = await docker.buildImage(imageName, repo)

    if (id !== null) {
        const build = new Build({ 
            userId: userId,
            username: username,
            repo: repo,
            imageName: imageName,
            created: Date.now(),
            imageId: id,
            description: description
        })
        build.save(function(err) {
            if (err) {
                console.log("\n[-] Build failed to save")
                console.log(err)
            }
            else {
                console.log("\n[+] Build saved successfully")
                
                const url = "http://localhost:5000/api/container/create"
                const data = {
                    userId: userId,
                    username: username,
                    imageName: imageName,
                    description: description
                }

                axios.post(url, data).catch(err => {
                    console.log(err)
                })
            }
        })
    }
}

exports.deleteBuild = async function(req, res) {
    const imageId = req.body.imageId

    console.log("\n[+] Deleting image...")

    const status = await docker.deleteImage(imageId)

    if (status !== undefined || status !== null) {
        Build.findOneAndDelete({ imageId: imageId }, (err, doc) => {
            if (err) {
                console.log(err)
                res.send("Image failed to delete")
            }
            else {
                console.log("\n[+] Image deleted successfully")
                res.send("Image deleted successfully")
            }
        })
    }
    else {
        console.log("\n[-] Image failed to delete")
        res.send("Image failed to delete")
    }
}