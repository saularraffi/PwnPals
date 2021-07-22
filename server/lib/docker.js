const { spawnSync } = require('child_process');

function spawn_process(script, func, args) {
    const cmd_args = [func]

    for (const arg of args) {
        cmd_args.push(arg)
    }

    const result = spawnSync(script, cmd_args, {
        stdio: 'pipe',
        encoding: 'utf-8'
    });
    
    console.log(String(result.stdout));
    console.log(String(result.stderr));
    
    return result.status
}

exports.build_image = function (repo, branch, image_name) {
    return spawn_process('scripts/docker_build.sh', "build_image", [repo, branch, image_name])
}

exports.destroy_image = function(image_name) {
    return spawn_process("scripts/docker_build.sh", "destroy_image", [image_name])
}

exports.run_container = function(image_name, app_port, visible_port) {
    return spawn_process("scripts/docker_container.sh", "run_container", [
        image_name, 
        app_port, 
        visible_port
    ])
}

exports.start_container = function(container_id) {
    return spawn_process("scripts/docker_container.sh", "start_container", [container_id])
}

exports.stop_container = function(container_id) {
    return spawn_process("scripts/docker_container.sh", "stop_container", [container_id])
}

exports.delete_container = function (container_id) {
    return spawn_process("scripts/docker_container.sh", "delete_container", [container_id])
}