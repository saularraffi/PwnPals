function isLoggedIn(req, res, next) {
    console.log("is logged in")
    return next()
}

module.exports = isLoggedIn