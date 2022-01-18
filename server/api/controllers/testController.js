const Test = require("../models/Test")
const http = require('http');
const https = require('https');
const axios = require('axios')

// handle single object retrieval
function getTest(req, res) {

    // console.log(req.user)
    
    Test.find({}, function(err, docs) {
        console.log(docs)

        if (err) { console.log(err) }
    })
    res.send("GET test") 
}

// handle single object creation
function postTest(req, res) {
    axios.post("http://localhost:5000/api/container")
    .then(response => {
        res.send("Success")
        console.log(res.statusCode)
    })
    .catch(err => {
        res.send("Failed")
        console.log(err)
    })
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