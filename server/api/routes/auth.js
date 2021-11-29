const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.get(`${endpoint}/google`, passport.authenticate('google'))
router.get(`${endpoint}/local`, passport.authenticate('local'), (req, res) => {
    console.log("Access granted")
    res.send("Access granted")
})

module.exports = router