const mongoose = require("mongoose")

const Build = mongoose.Schema({
    owner: String,
    repo: String,
    branch: String,
    imageName: String,
    created: Date,
    hash: String
})

module.exports = mongoose.model("build", Build)