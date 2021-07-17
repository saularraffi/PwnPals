const Tests = require("../../models/Test")

// handle mass object retrieval 
function getTests(req, res) {
    Tests.find({}, function(err, users) {
        console.log(users)

        if (err) { console.log(err) }
    })
    res.send("GET tests") 
}

// handle single object retrieval
function getTest(req, res) { res.send("GET test") }

// handle single object creation
function postTest(req, res) {
    const test = new Tests({ name: "testyyyy" })
    test.save(function(err) {
        if (err) { console.log(err) }
    })
    res.send("POST test") 
}

// handle single object update
function updateTest(req, res) { res.send("PUT test") }

// handle single object deletion
function deleteTest(req, res) { res.send("DELETE test") }

// module.exports = { getTests, getTest, postTest, updateTest, deleteTest }
module.exports.getTests = getTests
module.exports.getTest = getTest
module.exports.postTest = postTest
module.exports.updateTest = updateTest
module.exports.deleteTest = deleteTest