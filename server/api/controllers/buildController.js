const Build = require("../../models/Build")

function build_container(req, res) {
    const build = new Build({ 
        owner: "user123",
        repo: "https://github.com/saularraffi/test-app.git",
        branch: "main",
        appName: "testApp"
    })
    build.save(function(err) {
        if (err) { console.log(err) }
    })
    res.send("Building container") 
}

module.exports.build_container = build_container