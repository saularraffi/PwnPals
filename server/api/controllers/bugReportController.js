const BugReport = require("../models/BugReport")


exports.getReport = function(req, res) { 
    res.send("GET report") 
}

exports.getReports = function(req, res) { 
    res.send("GET reports") 
}

exports.postReport = function(req, res) {
    res.send("POST report")
}

exports.updateReport = function(req, res) { 
    res.send("PUT report") 
}

exports.deleteReport = function(req, res) { 
    res.send("DELETE report") 
}
