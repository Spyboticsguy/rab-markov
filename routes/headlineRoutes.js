'use strict'

module.exports = function (app) {
  var headlines = require('../controllers/headlineController')

  // headline routes
  app.route('/headlines')
    .get(headlines.get_headline)
    .post(headlines.add_headline)

  app.route('/')
    .get((req, res) => {
      res.render('index', {
        title: 'Red and Black Headline Generator',
        message: headlines.get_headline_pure(20)
      })
    })
}
