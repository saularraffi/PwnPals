const express = require("express")
const router = express.Router()
const passport = require('passport')

const endpoint = "/auth"

router.get(endpoint, passport.authenticate('google'))
// router.get(endpoint, passport.authenticate('google', {
//     successRedirect: 'auth/success',
//     failureRedirect: 'auth/failed',
// }))
// router.get(`${endpoint}/success`, (req, res) => {
//     console.log("authentication success")
//     res.send("authentication success")
// })
// router.get(`${endpoint}/failed`, (req, res) => {
//     console.log("authentication failed")
//     res.sendStatus(401)
// })
// router.get(`${endpoint}/logout`, (req, res) => {
//     req.logout()
//     console.log("logging out")
//     res.send("logging out")
// })

module.exports = router