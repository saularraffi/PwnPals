const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.post(`${endpoint}/google`, passport.authenticate('google'))
router.post(`${endpoint}/local`, passport.authenticate('local'), (req, res) => {
    // console.log(req.session.passport.user)
    // res.cookie('sessionId', req.session.passport.user.id)
    req.session.cookie['sessionId'] = req.session.id
    // console.log(req.session.id)
    // console.log(req.session.cookie)

    // console.log(req.session)
    // console.log(req.user)
    res.cookie('cookie', req.session.cookie, {
        httpOnly: false,
        secure: false,
        sameSite: true,
        signed: false,
    })
    // res.setHeader('test', 'blablabla')
    // res.setHeader('set-cookie', 'blablabla')
    // console.log(req.headers)
    console.log(res.getHeaders())
    // res.redirect('http://localhost:3000/apps')
    res.send(req.user.id)
})

module.exports = router