const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const User = mongoose.Schema({
    username: String,
    password: String,
    following: {
        type: Array,
        default: []
    }
})

User.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

User.methods.addUserToFollowings = async function(user) {
    this.following.push(user)
    return await this.following
}

User.methods.removeUserFromFollowings = async function(user) {
    const index = this.following.indexOf(user);
    if (index > -1) {
        this.following.splice(index, 1);
    }
    return await this.following
}

module.exports = mongoose.model("user", User)