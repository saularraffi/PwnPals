const express = require("express")
const userController = require("../controllers/userController.js")
const router = express.Router()

const endpoint = "/user"

router.get(endpoint, userController.getUser)
router.get(`${endpoint}/all`, userController.getAllUsers)
router.get(`${endpoint}/verify`, userController.verifyUser)
router.post(endpoint, userController.postUser)
router.put(endpoint, userController.updateUser)
router.delete(endpoint, userController.deleteUser)

module.exports = router