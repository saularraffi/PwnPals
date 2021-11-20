const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "797572996428-f90h1g78pd7gadjlltika027g8jeqef6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID:           GOOGLE_CLIENT_ID,
    clientSecret:       GOOGLE_CLIENT_SECRET,
    callbackURL:        "http://localhost:3000/home",
    passReqToCallback:  true,
    scope:              "email"
},
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));