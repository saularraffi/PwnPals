function isLoggedIn(req, res, next) {
    // replacing req.isAuthenticated because req.isAuthenticated looks for req.user and req.user gets its
    // value from passport.user inside the cookie, but passport is empty in the cookie in the session store
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