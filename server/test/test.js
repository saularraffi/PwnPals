const { spawn, spawnSync, execSync } = require('child_process');

async function spawn_process(script) {
    const cmd = await spawn(script);

    cmd.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    cmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    cmd.on('error', (err) => {
        console.log(err)
    })

    cmd.on('close', (code) => {
        console.log(`[+] child process exited with code ${code}`);
        return code
        // Promise.resolve(code)
    });
}

// function spawn_process(script) {
//     try {
//         console.log("spawning process")
//         const proc = spawnSync(script)
//         return proc.status
//     }
//     catch (err) {
//         console.log('Error: ', err)
//         return 1
//     }
// }

function run() {
    // return spawn_process("./test.sh")
    var result = spawnSync('./test.sh', {
        stdio: 'pipe',
        encoding: 'utf-8'
    });
    
    console.log(String(result.stdout));
    return result.status
}

console.log(run())