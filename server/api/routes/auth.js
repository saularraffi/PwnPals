const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.post(`${endpoint}/google`, passport.authenticate('google'))
router.post(`${endpoint}/local`, passport.authenticate('local'), (req, res) => {
    // console.log(req.session.passport.user)
    // console.log(req.headers)
    // res.cookie('sessionId', req.session.passport.user.id)
    req.session.cookie['sessionId'] = req.session.id
    console.log(req.session.id)
    console.log(req.session.cookie)
    // res.redirect('http://localhost:3000/apps')
    res.send(req.user.id)
})

module.exports = router