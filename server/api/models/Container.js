const mongoose = require("mongoose")

const Container = mongoose.Schema({
    userId: String,
    username: String,
    imageId: String,
    imageName: String,
    containerId: String,
    port: Number,
    created: Date,
    status: String
})

module.exports = mongoose.model("container", Container)