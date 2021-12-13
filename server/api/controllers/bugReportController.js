const BugReport = require("../models/BugReport")


exports.getReport = function(req, res) { 
    const { id } = req.query

    BugReport.findById(id, function(err, bugReport) {
        if (err) {
            console.log(err)
            res.send("Failed to find bug report")
        }
        else if (!bugReport) {
            console.log(`Could not find bug report with id ${id}`)
            res.send("Could not find the specified bug report")
        }
        else {
            res.send(bugReport) 
        }
    })
}

exports.getAllReports = function(req, res) { 
    const { appId } = req.query
    const { userId } = req.query

    let filter = {}

    if (appId !== undefined) { filter['appId'] = appId }
    else if (userId !== undefined) { filter['userId'] = userId }

    BugReport.find(filter, function(err, bugReports) {
        if (err) {
            console.log(err)
            res.send("Failed to find bug reports")
        }
        else {
            res.send(bugReports) 
        }
    })
}

exports.postReport = function(req, res) {
    const { userId } = req.body
    const { title } = req.body
    const { description } = req.body
    const { appId } = req.body

    const bugReport = new BugReport({
        userId: userId,
        title: title,
        description: description,
        appId: appId,
        created: Date.now()
    })
    bugReport.save(function(err) {
        if (err) {
            console.log(err)
            res.send("Error saving bug report")
        }
        else {
            console.log(bugReport)
            res.send(bugReport)
        }
    })
}

exports.updateReport = function(req, res) {
    const { id } = req.body
    const { userId } = req.body
    const { title } = req.body
    const { description } = req.body
    const { imageId } = req.body

    let update = {}

    if (userId !== undefined) { update['userId'] = userId }
    if (title !== undefined) { update['title'] = title }
    if (description !== undefined) { update['description'] = description }
    if (imageId !== undefined) { update['imageId'] = imageId }

    BugReport.findByIdAndUpdate(id, update, function(err, bugReport) {
        if (err) {
            console.log(err)
            res.send("Error updating bug report")
        }
        else if (!bugReport) {
            console.log(`Could not find bug report with id ${id}`)
            res.send("Could not find the specified bug report to update")
        }
        else {
            console.log(bugReport)
            res.send(bugReport)
        }
    })
}

exports.deleteReport = function(req, res) { 
    const { id } = req.body

    console.log(req.body)

    BugReport.findByIdAndDelete(id, function(err, bugReport) {
        if (err) {
            console.log(err)
            res.send("Error updating bug report")
        }
        else {
            console.log(bugReport)
            res.send(bugReport)
        }   
    })
}
