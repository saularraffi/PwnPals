const express = require("express")
const commentController = require("../controllers/commentController")
const router = express.Router()

const endpoint = "/comment"

router.post(endpoint, commentController.postComment)
router.put(endpoint, commentController.updateComment)
router.delete(endpoint, commentController.deleteComment)

module.exports = router