const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const User = mongoose.Schema({
    username: String,
    password: String
})

User.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("user", User)