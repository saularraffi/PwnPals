const mongoose = require("mongoose")

const BugReport = mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    imageId: String,
    created: Date
})

module.exports = mongoose.model("bugreport", BugReport)