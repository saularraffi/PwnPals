const mongoose = require("mongoose")

const User = mongoose.Schema({
    username: String,
    password: String
})

User.methods.verifyPassword = function(password) {
    if (this.password === password) { return true }
    else { return false }
}

module.exports = mongoose.model("user", User)