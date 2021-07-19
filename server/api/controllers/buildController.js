const { spawn } = require('child_process');
const axios = require('axios')

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
    });
}

function build_container(req, res) {
    const owner = "user123"
    const repo = "https://github.com/saularraffi/test-app.git"
    const branch = "main"
    const appName = "testApp"

    const build_status_code = build_and_run(repo, branch, appName)   

    if (true) {
        axios.post("http://localhost:5000/api/container")
        .then(response => {
            res.send("Container built successfully")
            console.log(`Connecting to db - ${res.statusCode}`)
        })
        .catch(err => {
            res.send("Database connection failed after build")
            console.log(err)
        })
    }
    else {
        res.send("Failed to build container")
    }
}

module.exports.build_container = build_container