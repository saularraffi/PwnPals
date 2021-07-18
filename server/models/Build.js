const mongoose = require("mongoose")

const build = mongoose.Schema({
    owner: String,
    repo: String,
    branch: String,
    appName: String
})

module.exports = mongoose.model("build", build)