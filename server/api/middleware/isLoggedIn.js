function isLoggedIn(req, res, next) {
    if (req.session.user) {
        return next()
    }
    else {
        res.status(401).send("Access Denied")
        // res.redirect(403, '/login')
        // res.status(403).redirect('/login')();
    }
}

module.exports = isLoggedIn