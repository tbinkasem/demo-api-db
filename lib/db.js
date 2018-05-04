const util = require('./util')
const config = require('../config')

const knex = require('knex')({
  client: 'mysql',
  connection: config.db,
  debug: true,
  // postProcessResponse(result) {
  //   if (Array.isArray(result)) {
  //     return result.map(row => typeof row === 'number' ? row : util.snakeToCamel(row))
  //   } else {
  //     return util.snakeToCamel(result)
  //   }
  // },
  // wrapIdentifier(value) {
  //   if (value === '*') {
  //     return value
  //   }
  //   return '`' + util.camelToSnake(value) + '`'
  // },
})

module.exports = knex
