const express = require("express")
const buildController = require("../controllers/buildController2.js")
const router = express.Router()

const endpoint = "/build"

router.get(endpoint, buildController.getBuild)
router.post(endpoint, buildController.postBuild)
router.delete(endpoint, buildController.deleteBuild)

module.exports = router