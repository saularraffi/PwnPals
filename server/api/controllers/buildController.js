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

async function postBuild(req, res) {
    const owner = req.body.owner
    const repo = req.body.repo
    const branch = req.body.branch
    const imageName = req.body.imageName

    console.log("\n[+] Building Image...")

    const build_result = docker.build_image(repo, branch, imageName)
    const status_code = build_result.status

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to build image")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    // remove any previous build(s) from database
    await Build.deleteMany({ imageName: imageName })
    .then(function() {
        console.log("Previous build(s) deleted"); // Success
    })
    .catch(function(error) {
        console.log(error); // Failure
    });

    // save to database
    const build = new Build({ 
        owner: owner,
        repo: repo,
        branch: branch,
        imageName: imageName,
        created: build_result.image_info.Created,
        hash: build_result.image_info.ContainerConfig.Image
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

function deleteBuild(req, res) {
    const imageName = req.body.imageName

    const status_code = docker.destroy_image(imageName)

    if (status_code !== 0 ) {
        console.log(`\n[-] Process exited with status code ${status_code}`)
        res.send("Failed to delete image")
        return
    }

    console.log(`\n[+] Process exited with status code ${status_code}`)

    // Build.findOneAndDelete(_id, (err, doc) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     else {
    //         console.log("\n")
    //         console.log(doc)
    //     }
    // })

    Build.deleteMany({ imageName: imageName })
    .then(function() {
        console.log("\n[+] Image deleted successfully"); // Success
    })
    .catch(function(error) {
        console.log(error); // Failure
    });

    res.send("DELETE build")
}

module.exports.getBuild = getBuild
module.exports.postBuild = postBuild
module.exports.deleteBuild = deleteBuild