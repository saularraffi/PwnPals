const mongoose = require("mongoose")

const Build = mongoose.Schema({
    owner: String,
    repo: String,
    branch: String,
    appName: String
})

module.exports = mongoose.model("build", Build)