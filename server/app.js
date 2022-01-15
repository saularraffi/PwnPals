// required libraries
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')

// requiring routes
const testRoute = require("./api/routes/test")
const userRoute = require("./api/routes/user")
const authRoute = require("./api/routes/auth")
const buildRoute = require("./api/routes/build")
const containerRoute = require("./api/routes/container")
const bugReportRoute = require("./api/routes/bugReport")
const commentRoute = require("./api/routes/comment")

// variable declarations
const app = express()
const basePath = "/api"
// const hostname = '127.0.0.1';
const hostname = '0.0.0.0'
const port = 5000;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
    exposedHeaders: ["set-cookie", "Set-Cookie", "test"] 
}))

// using body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// session stuff
const oneDay = 1000 * 60 * 60 * 24;
const sessionSecret = 'thisisnotmysecret'  // save this as an env variable
app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false,
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/pwnpals-sessions',
        autoRemove: 'native',
        ttl: oneDay,
        mongoOptions: {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    })
}))
app.use(cookieParser(sessionSecret))

// passport auth stuff
app.use(passport.initialize())
app.use(passport.session())
const setupPassport = require('./auth/setup')
setupPassport()

// using routes in app
app.use(basePath, testRoute)
app.use(basePath, userRoute)
app.use(basePath, authRoute)
app.use(basePath, buildRoute)
app.use(basePath, containerRoute)
app.use(basePath, bugReportRoute)
app.use(basePath, commentRoute)

mongoose.connect('mongodb://localhost:27017/pwnpals', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("\n[+] MongoDB connection successful")

    app.listen(port, hostname, () => {
        console.log(`\n[+] Server running at http://${hostname}:${port}/`);
    });    
})
.catch(() => {
    console.log("\n[-] MongoDB connection failed")
})
