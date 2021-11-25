const express = require("express")
const containerController = require("../controllers/containerController.js")
const router = express.Router()

const endpoint = "/container"

router.get(endpoint, containerController.getContainer)
router.post(`${endpoint}/create`, containerController.createContainer)
router.post(`${endpoint}/start`, containerController.startContainer)
router.post(`${endpoint}/stop`, containerController.stopContainer)
router.delete(endpoint, containerController.deleteContainer)

module.exports = router