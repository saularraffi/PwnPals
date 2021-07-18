const Build = require("../../models/Build")
const { spawn } = require('child_process');

function build_and_run(repo, branch, appName) {
    const build = spawn('scripts/docker_build.sh', [repo, branch, appName]);

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
        return 0
    });
}

function build_container(req, res) {
    const owner = "user123"
    const repo = "https://github.com/saularraffi/test-app.git"
    const branch = "main"
    const appName = "testApp"

    const build_successul = build_and_run(repo, branch, appName)

    if (build_successul) {
        const build = new Build({ 
            owner: owner,
            repo: repo,
            branch: branch,
            appName: appName
        })
        build.save(function(err) {
            if (err) { 
                console.log(err) 
            }
            else {
                console.log("[+] Successfully saved build to database")
            }
        })
        res.send("Building container")
    }
    else {
        res.send("Failed to build container")
    }
}

module.exports.build_container = build_container