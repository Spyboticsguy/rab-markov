'use strict'

module.exports = function (app) {
  var headlines = require('../controllers/headlineController')

  // headline routes
  app.route('/headlines')
    .get(headlines.get_headline)
    .post(headlines.add_headline)
}
