const express = require("express")
const testController = require("../controllers/testController.js")
const router = express.Router()
const passport = require('passport')

const endpoint = "/test"

router.get(endpoint, passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
}))

// router.get(endpoint, testController.getTest)
router.post(endpoint, testController.postTest)
router.put(endpoint, testController.updateTest)
router.delete(endpoint, testController.deleteTest)

module.exports = router