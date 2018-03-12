var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/headlineRoutes')

// express setup
var app = express()
var port = process.env.PORT || 3000

// set up request parsers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(port)

// register routes
routes(app)

console.log('RESTful API server started on: ' + port)
