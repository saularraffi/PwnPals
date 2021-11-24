const Build = require("../models/Build")
const docker = require("../../lib/docker.js")
const docker2 = require("../../lib/docker2.js")

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
    const repo = req.body.repo
    const imageName = req.body.imageName

    console.log("\n[+] Building Image...")

    docker2.buildImage(imageName, repo)
    .then(id => {
        // add image to database with image ID as a field
        
        console.log("this is the imageId")
        console.log(id)
    })

    res.send("Building image...")
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