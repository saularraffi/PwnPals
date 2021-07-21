const express = require("express")
const containerController = require("../controllers/containerController.js")
const router = express.Router()

const endpoint = "/container"

router.get(endpoint, containerController.getContainer)
router.post(endpoint, containerController.postContainer)
router.post(`${endpoint}/run`, containerController.runContainer)
router.post(`${endpoint}/start`, containerController.startContainer)
router.post(`${endpoint}/stop`, containerController.stopContainer)
router.put(endpoint, containerController.updateContainer)
router.delete(endpoint, containerController.deleteContainer)

module.exports = router