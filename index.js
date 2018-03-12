var express = require('express')
var bodyParser = require('body-parser')
var routes = require('./routes/headlineRoutes')

// express setup
var app = express()
var port = process.env.PORT || 3000

// set up request parsers
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// serve public files
app.use(express.static('public'))

// set up template engine
app.set('view engine', 'pug')

app.listen(port)

// register routes
routes(app)

// handle 404s
app.use((req, res, next) => {
  res.status(404)
  res.render('404')
})

console.log('RESTful API server started on: ' + port)
