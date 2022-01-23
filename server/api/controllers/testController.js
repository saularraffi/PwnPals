const Test = require("../models/Test")
const http = require('http');
const https = require('https');

// handle single object retrieval
function getTest(req, res) {

    console.log(req.session.user)
    console.log(req.headers.cookie)

    res.send("this_is_the_secret") 
}

// handle single object creation
function postTest(req, res) {
    console.log(req.session.user)
    console.log(req.headers.cookie)

    res.send("POST tets")
}

// handle single object update
function updateTest(req, res) { 
    res.send("PUT test") 
}

// handle single object deletion
function deleteTest(req, res) { 
    res.send("DELETE test") 
}

// module.exports = { getTest, postTest, updateTest, deleteTest }
module.exports.getTests = getTest
module.exports.getTest = getTest
module.exports.postTest = postTest
module.exports.updateTest = updateTest
module.exports.deleteTest = deleteTest