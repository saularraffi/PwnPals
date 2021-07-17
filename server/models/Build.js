const mongoose = require("mongoose")

const build = mongoose.Schema({
    user: String,
    repo: String,
    branch: String
})

module.exports = mongoose.model("build", build)