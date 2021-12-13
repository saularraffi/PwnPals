const mongoose = require("mongoose")

const BugReport = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    appId: String,
    created: Date
})

module.exports = mongoose.model("bugreport", BugReport)