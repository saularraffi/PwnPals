const { spawnSync } = require('child_process');

exports.spawnProcess = function(script, args=[], options={}) {
    options['stdio'] = 'pipe'
    options['encoding'] = 'utf-8'

    const result = spawnSync(script, args, options);

    const return_data = {
        "stdout": String(result.stdout),
        "stderr": String(result.stderr),
        "status": result.status
    }
    
    return return_data
}