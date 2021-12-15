const User = require("../models/User")
const bcrypt = require('bcrypt')


exports.getUser = function(req, res) {
    const id = req.query.id

    User.findById(id, function(err, user) {
        if (err) {
            console.log(err)
            res.send("Failed to find user")
        }
        else if (!user) {
            console.log(`Could not find user with id ${id}`)
            res.send("Could not find the specified user")
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

exports.getSearchedUsers = function(req, res) {
    const search = req.query.search

    const r = new RegExp(search, 'i');

    User.find({ username: { $regex: r, $options: 'i' }}, function(err, users) {
        if (err) {
            console.log(err)
            res.send("Failed to find users")
        }
        else {
            res.send(users) 
        }
    })
}

exports.verifyUser = function(req, res) {
    const username = req.query.username

    User.find({ username: username }, function(err, user) {
        if (err) {
            console.log(err)
            res.status(500).send('Database Error');
        }
        else if (user.length === 0) {
            console.log('User does not exist')
            res.status(404).send('User does not exist');
        }
        else {
            console.log("user exists")
            res.status(200).send(user);
        }
    })
}

exports.postUser = async function(req, res) {
    const username = req.body.username
    const password = req.body.password

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username: username,
        password: passwordHash
    })
    user.save(function(err) {
        if (err) {
            console.log(err)
            res.send("Error saving user")
        }
        else {
            console.log(user)
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
        else if (!user) {
            console.log(`Could not find user with id ${id}`)
            res.send("Could not find the specified user to update")
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