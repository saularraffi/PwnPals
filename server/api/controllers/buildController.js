const Build = require("../models/Build")
const { spawn } = require('child_process');

function build_image(repo, branch, app_name) {
    const build = spawn('scripts/docker_build.sh', [repo, branch, app_name]);

    build.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    build.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    build.on('error', (err) => {
        console.log(err)
    })

    build.on('close', (code) => {
        console.log(`[+] child process exited with code ${code}`);
    });
}

function getBuild(req, res) {
    res.send("GET build")
}

function postBuild(req, res) {
    const owner = req.body.owner
    const repo = req.body.repo
    const branch = req.body.branch
    const app_name = req.body.app_name

    // can't access return value because process is async
    const status_code = build_image(repo, branch, app_name)  

    // save to database
    if (true) {
        const build = new Build({ 
            owner: owner,
            repo: repo,
            branch: branch,
            app_name: app_name
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

function updateBuild(req, res) {
    const owner = req.body.owner
    const repo = req.body.repo
    const branch = req.body.branch
    const app_name = req.body.app_name

    res.json(req.body)
}

function deleteBuild(req, res) {
    res.send("DELETE build")
}

module.exports.getBuild = getBuild
module.exports.postBuild = postBuild
module.exports.updateBuild = updateBuild
module.exports.deleteBuild = deleteBuild