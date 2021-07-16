// required libraries
const express = require('express')
const mongoose = require('mongoose')
const http = require('http');
const path = require('path');

// variable declarations
const app = express()
const basePath = "/api"
const hostname = '127.0.0.1';
const port = 3000;

// requiring routes
const test = require("./api/routes/test")

// using routes in app
app.use(basePath, test)

// set up root route
app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("Welcome to Pwn Pals!")
})

mongoose.connect('mongodb://localhost:27017/pwnpals', 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
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