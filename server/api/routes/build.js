const express = require("express")
const buildController = require("../controllers/buildController.js")
const router = express.Router()

const endpoint = "/build"

router.post(endpoint, buildController.build)

module.exports = router