const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.post(`${endpoint}/google`, passport.authenticate('google'))
router.post(`${endpoint}/local`, passport.authenticate('local'), (req, res) => {
    // req.session.cookie['sessionId'] = req.session.id
    // res.cookie('sessionId', req.session.id, {
    //     httpOnly: false,
    //     secure: false,
    //     sameSite: false,
    //     signed: false,
    // })
    req.session.passport = { user: req.user._id }
    console.log(req.session)
    res.send(req.user.id)
})

module.exports = router