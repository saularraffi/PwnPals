const express = require("express")
const containerController = require("../controllers/containerController2.js")
const router = express.Router()

const endpoint = "/container"

router.get(endpoint, containerController.getContainer)
router.post(`${endpoint}/run`, containerController.runContainer)
router.post(`${endpoint}/start`, containerController.startContainer)
router.post(`${endpoint}/stop`, containerController.stopContainer)
router.delete(endpoint, containerController.deleteContainer)

module.exports = router