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

    const return_data = {
        "stdout": String(result.stdout),
        "stderr": String(result.stderr),
        "status": result.status
    }

    console.log(return_data.stdout)
    console.log(return_data.stderr)
    
    return return_data
}

function get_image_info(image_name) {
    const result = spawn_process("scripts/docker_build.sh", "get_image_info", [image_name])
    return JSON.parse(result.stdout)[0]
}

function get_container_info(container_id) {
    const result = spawn_process("scripts/docker_container.sh", "get_container_info", [container_id])
    return JSON.parse(result.stdout)[0]
}

function get_container_id(image_name) {
    const result = spawn_process("scripts/docker_container.sh", "get_container_id", [image_name])
    return String(result.stdout).replace(/(\n|\n|\r)/gm, "")
}

exports.build_image = function (repo, branch, image_name) {
    const result = spawn_process('scripts/docker_build.sh', "build_image", [repo, branch, image_name])
    const image_info = get_image_info(image_name)
    return { "status": result.status, "image_info": image_info }
}

exports.destroy_image = function(image_name) {
    const result = spawn_process("scripts/docker_build.sh", "destroy_image", [image_name, "-f"])
    return result.status
}

exports.run_container = function(image_name, app_port, visible_port) {
    const result = spawn_process("scripts/docker_container.sh", "run_container", [
        image_name, 
        app_port, 
        visible_port
    ])
    const container_id = get_container_id(image_name)
    const container_info = get_container_info(container_id)

    return { "status": result.status, "container_info": container_info }
}

exports.start_container = function(image_name) {
    const result = spawn_process("scripts/docker_container.sh", "start_container", [image_name])
    return result.status
}

exports.stop_container = function(image_name) {
    const result = spawn_process("scripts/docker_container.sh", "stop_container", [image_name])
    return result.status
}

exports.delete_container = function (image_name) {
    const result = spawn_process("scripts/docker_container.sh", "delete_container", [image_name])
    return result.status
}