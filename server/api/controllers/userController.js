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
            res.send("User saved successfully")
        }
    })
}

exports.updateUser = function(req, res) {
    const id = req.body.id
    const username = req.body.username
    const password = req.body.password

    let update = {}

    if (username === null) { update['username'] = username }
    if (password === null) { update['password'] = password }

    User.findByIdAndUpdate(id, update, function(err, doc) {
        if (err) {
            console.log(err)
            res.send("Error updating user")
        }
        else {
            console.log(doc)
            res.send("Successfully updated user")
        }
    })
}

exports.deleteUser = function(req, res) { 
    const id = req.body.id

    User.findByIdAndDelete(id, function(err, doc) {
        if (err) {
            console.log(err)
            res.send("Error updating user")
        }
        else {
            console.log(doc)
            res.send("Successfully updated user")
        }   
    })
}