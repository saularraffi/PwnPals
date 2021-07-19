const mongoose = require("mongoose")

const container = mongoose.Schema({
    owner: String,
    repo: String,
    branch: String,
    appName: String
})

module.exports = mongoose.model("container", container)