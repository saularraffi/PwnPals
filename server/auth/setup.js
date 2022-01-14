const passport = require('passport')
const User = require('../api/models/User')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy

const GOOGLE_CLIENT_ID = "797572996428-f90h1g78pd7gadjlltika027g8jeqef6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID:           GOOGLE_CLIENT_ID,
            clientSecret:       GOOGLE_CLIENT_SECRET,
            callbackURL:        "http://localhost:3000/home",
            passReqToCallback:  true,
            scope:              "email",
        },
        function(request, accessToken, refreshToken, profile, done) {
            console.log("authenticating")
            return done(null, profile)
        }
    ));

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, async function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Username not found'}); }
                if (!await user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((user, done) => {
        User.findById(user.id).then(user => {
            done(null, user)
        })
        .catch(err => done(err))
    })
}
