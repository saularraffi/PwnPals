const mongoose = require("mongoose")

const Container = mongoose.Schema({
    owner: String,
    appName: String,
    appID: String,
    status: String
})

module.exports = mongoose.model("container", Container)