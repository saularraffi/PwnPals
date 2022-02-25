const express = require("express")
const userAppController = require("../controllers/userAppController.js")
const router = express.Router()

const endpoint = "/user-app"

router.get(endpoint, userAppController.getUserApp)
router.get(`${endpoint}/all`, userAppController.getAllUserApps)
router.get(`${endpoint}/search`, userAppController.getSearchedUserApps)
router.post(endpoint, userAppController.createUserApp)
router.post(`${endpoint}/start`, userAppController.startUserApp)
router.post(`${endpoint}/stop`, userAppController.stopUserApp)
router.delete(endpoint, userAppController.deleteUserApp)

module.exports = router