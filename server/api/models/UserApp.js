const mongoose = require("mongoose")

const UserApp = mongoose.Schema({
    userId: String,
    username: String,
    repo: String,
    appName: String,
    created: Date,
    imageId: String,
    containerId: String,
    dockerExposedPort: String,
    description: String,
    port: Number,
    status: String,
})

module.exports = mongoose.model("userapp", UserApp)