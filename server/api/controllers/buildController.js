const Build = require("../models/Build")
const docker = require("../../lib/docker.js")


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
            }
        })
    }
}

exports.deleteBuild = function(req, res) {
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