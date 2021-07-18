const Test = require("../../models/Test")

// handle single object retrieval
function getTest(req, res) { 
    Test.find({}, function(err, users) {
        console.log(users)

        if (err) { console.log(err) }
    })
    res.send("GET test") 
}

// handle single object creation
function postTest(req, res) {
    const test = new Test({ name: "testyyyy" })
    test.save(function(err) {
        if (err) { console.log(err) }
    })
    res.send("POST test") 
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