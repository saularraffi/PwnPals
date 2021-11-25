const mongoose = require("mongoose")

const Build = mongoose.Schema({
    user: String,
    repo: String,
    branch: String,
    imageName: String,
    created: Date,
    imageId: String
})

module.exports = mongoose.model("build", Build)