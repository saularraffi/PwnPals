const mongoose = require("mongoose")

const Container = mongoose.Schema({
    owner: String,
    imageName: String,
    appID: String,
    port: Number,
    created: Date,
    status: String
})

module.exports = mongoose.model("container", Container)