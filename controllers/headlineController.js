'use strict'

var MarkovChain = require('markovchain')
var fs = require('fs')
var path = require('path')

const HEADLINE_LENGTH = 20
const HEADLINE_FILE = path.join(__dirname, '../resources/headlines.txt')

var headlines = new MarkovChain(fs.readFileSync(HEADLINE_FILE, 'utf8'))

var upperCaseWords = function (wordList) {
  var regex = /^[A-Z].*$/

  // test against uppercase regex
  var startWords = Object.keys(wordList).filter((word) => {
    return regex.test(word)
  })

  // return random word from list
  return startWords[Math.floor(Math.random() * startWords.length)]
}

exports.get_headline = function (req, res) {
  var length = (req.query.length === undefined) ? HEADLINE_LENGTH : req.query.length
  var headline = getHeadlinePure(length)

  // pass generated headline to response
  res.json({headline: headline})
}

exports.add_headline = function (req, res) {
  // add given headline to markov chain generator
  headlines.parse(req.body.headline)

  // update stored headlines
  fs.appendFile(HEADLINE_FILE,
    req.body.headline + '\n', () => {
      console.log('Added headline: ' + req.body.headline)
    })

  // send response acknowledging added headline
  res.status(200).json(req.body)
}

var getHeadlinePure = function (length) {
  var headline = headlines.start(upperCaseWords).end(length).process()
  console.log('Generated headline: "' + headline + '" with length: ' + length)
  return headline
}

exports.get_headline_pure = getHeadlinePure
