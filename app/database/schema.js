/* Database definition */

var database = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'knex, public'
};

var knex = require('knex')(database);
var bookshelf = require('bookshelf')(knex);
