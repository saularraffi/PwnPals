const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.post(`${endpoint}/google`, passport.authenticate('google'))
router.post(`${endpoint}/local`, passport.authenticate('local'), (req, res) => {
    req.session.user = { id: req.user.id, username: req.user.username }
    res.send(req.user.id)
})

module.exports = router