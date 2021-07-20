const express = require("express")
const buildController = require("../controllers/buildController.js")
const router = express.Router()

const endpoint = "/build"

router.get(endpoint, buildController.getBuild)
router.post(endpoint, buildController.postBuild)
router.put(endpoint, buildController.updateBuild)
router.delete(endpoint, buildController.deleteBuild)

module.exports = router