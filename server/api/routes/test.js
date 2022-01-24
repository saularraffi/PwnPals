const express = require("express")
const isLoggedIn = require("../middleware/isLoggedIn")
const testController = require("../controllers/testController.js")
const router = express.Router()

const endpoint = "/test"

router.get(endpoint, isLoggedIn, testController.getTest)
router.post(endpoint, testController.postTest)
router.put(endpoint, testController.updateTest)
router.delete(endpoint, testController.deleteTest)

module.exports = router