const streamsql = require('streamsql')

const db = streamsql.connect({
  driver: 'sqlite3',
  filename: './resources/headlines.sqlite'
})

const headlineTable = db.table('headlines', {
  fields: ['headline']
})

/**
 * Adds a new headline to the database.
 * @param {string} headline The new headline to add.
 */
exports.add_headline = function (headline) {
  return headlineTable.put({
    headline: headline
  })
}

/**
 * Gets all the headlines from the database, asynchronously.
 * @returns {Promise} Promise which will result in all headlines
 * as a JSON array.
 */
exports.get_headlines = function () {
  return headlineTable.getAll()
}
