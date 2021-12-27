const BugReport = require("../models/BugReport")

function updateBugReport(res, id, comments) {
    console.log(comments)
    BugReport.findByIdAndUpdate(id, { comments: comments }, function(err, bugReport) {
        if (err) {
            console.log(err)
            res.send("Error updating bug report")
        }
        else if (!bugReport) {
            console.log(`Could not find bug report with id ${id}`)
            res.send("Could not find the specified bug report to update")
        }
        else {
            // console.log(bugReport)
            res.send(bugReport)
        }
    })
}

exports.postComment = function(req, res) {
    const { reportId } = req.body
    const { comment } = req.body

    BugReport.findById(reportId, async (err, report) => {
        const comments = await report.addComment(comment)
        updateBugReport(res, reportId, comments)
    })
}

exports.updateComment = function(req, res) {
    const { reportId } = req.body
    const { commentId } = req.body
    const { commentBody } = req.body

    BugReport.findById(reportId, async (err, report) => {
        const comments = await report.editComment(commentId, commentBody)
        updateBugReport(res, reportId, comments)
    })
}

exports.deleteComment = function(req, res) {
    const { reportId } = req.body
    const { commentId } = req.body

    BugReport.findById(reportId, async (err, report) => {
        const comments = await report.deleteComment(commentId)
        updateBugReport(res, reportId, comments)
    })
}