const { spawn } = require('child_process');

function spawn_process(script, func, args) {
    var cmd_args = [func]

    for (const arg of args) {
        cmd_args.push(arg)
    }

    const build = spawn(script, cmd_args);

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

exports.build_image = function (repo, branch, image_name) {
    spawn_process('scripts/docker_build.sh', "build_image", [repo, branch, image_name])
}

exports.destroy_image = function(image_name) {
    spawn_process("scripts/docker_build.sh", "destroy_image", [image_name])
}

exports.run_container = function(image_name, app_port, visible_port) {
    spawn_process("scripts/docker_container.sh", "run_container", [
        image_name, 
        app_port, 
        visible_port
    ])
}

exports.start_container = function(container_id) {
    spawn_process("scripts/docker_container.sh", "start_container", [container_id])
}

exports.stop_container = function(container_id) {
    spawn_process("scripts/docker_container.sh", "stop_container", [container_id])
}

exports.test = function () {
    spawn_process("scripts/docker_build.sh", "test", ["arg1", "arg2", "arg3"])
}