const Build = require("../../models/Build")

function build(req, res) {
    const build = new Build({ 
        user: "user123",
        repo: "https://github.com/saularraffi/test-app.git",
        branch: "main"
    })
    build.save(function(err) {
        if (err) { console.log(err) }
    })
    res.send("Building container") 
}

module.exports.build = build