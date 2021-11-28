const User = require("../models/User")


exports.getUser = function(req, res) {
    const id = req.body.id

    User.findById(id, function(err, user) {
        if (err) {
            console.log(err)
            res.send("Failed to find user")
        }
        else {
            res.send(user) 
        }
    })
}

exports.getAllUsers = function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err)
            res.send("Failed to find users")
        }
        else {
            res.send(users) 
        }
    })
}

exports.postUser = function(req, res) {
    const username = req.body.username
    const password = req.body.password

    const user = new User({
        username: username,
        password: password
    })
    user.save(function(err) {
        if (err) {
            console.log(err)
            res.send("Error saving user")
        }
        else {
            res.send(user)
        }
    })
}

exports.updateUser = function(req, res) {
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password

    let update = {}

    if (username !== undefined) { update['username'] = username }
    if (password !== undefined) { update['password'] = password }

    User.findByIdAndUpdate(id, update, function(err, user) {
        if (err) {
            console.log(err)
            res.send("Error updating user")
        }
        else {
            console.log(user)
            res.send(user)
        }
    })
}

exports.deleteUser = function(req, res) { 
    const id = req.body.id

    User.findByIdAndDelete(id, function(err, user) {
        if (err) {
            console.log(err)
            res.send("Error updating user")
        }
        else {
            console.log(user)
            res.send(user)
        }   
    })
}