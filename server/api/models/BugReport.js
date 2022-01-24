const mongoose = require("mongoose")

const BugReport = mongoose.Schema({
    userId: String,
    username: String,
    title: String,
    description: String,
    appId: String,
    created: Date,
    comments: [
        {
            userId: String,
            username: String,
            body: String
        }
    ]
})

BugReport.methods.addComment = async function(comment, userId, username) {
    const commentObj = {
        userId: userId,
        username: username,
        body: comment
    }
    this.comments.push(commentObj)
    return await this.comments
}

BugReport.methods.deleteComment = async function(id) {
    const index = this.comments.findIndex(comment => comment._id.toString() === id);
    if (index > -1) {
        this.comments.splice(index, 1);
    }
    return await this.comments
}

BugReport.methods.editComment = async function(id, body) {
    const index = this.comments.findIndex(comment => comment._id.toString() === id);
    if (index > -1) {
        this.comments[index].body = body
    }
    return await this.comments
}

module.exports = mongoose.model("bugreport", BugReport)