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

exports.postBuild = async function(req, res) {
    const user = req.body.user
    const repo = req.body.repo
    const imageName = req.body.imageName

    console.log("\n[+] Building Image...")

    res.send("Building image...")

    const id = await docker.buildImage(imageName, repo)

    if (id !== null) {
        const build = new Build({ 
            user: user,
            repo: repo,
            imageName: imageName,
            created: Date.now(),
            imageId: id
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
                    "user": user,
                    "imageName": imageName
                }

                axios.post(url, data).catch(err => {
                    console.log(err)
                })
            }
        })
    }
}

exports.deleteBuild = function(req, res) {
    const id = req.body.id
    const imageId = req.body.imageId

    res.send("Deleting image...")

    const status = docker.deleteImage(imageId)

    Build.findOneAndDelete(id, (err, doc) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("\n")
            console.log(doc)
        }
    })
}