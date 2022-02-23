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
const fs = require('fs')
const config = require('./config')

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

require('dotenv').config()

app.use(cors({
    origin: true,
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
app.use(cookieParser(sessionSecret))
app.use(session({
    secret: sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: oneDay, httpOnly: false },
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/pwnpals-sessions',
	    // mongoUrl: `mongodb+srv://doadmin:m4Q319aG50p8TB6H@db-mongodb-nyc1-pwnpals-64d3ae37.mongo.ondigitalocean.com/pwnpals-sessions?authSource=admin&replicaSet=db-mongodb-nyc1-pwnpals&tls=true&tlsCAFile=${__dirname}/ca-certificate.crt`,
        autoRemove: 'native',
        ttl: oneDay,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    })
}))

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

mongoose.connect(config.db.connectionString, config.db.options)
.then((res) => {
    console.log("\n[+] MongoDB connection successful")
    
    app.listen(config.app.port, config.app.host, () => {
        console.log(`\n[+] Server running at http://${config.app.host}:${config.app.port}/`);
    });    
})
.catch((err) => {
    console.log("\n[-] MongoDB connection failed\n")
    console.log(err)
})