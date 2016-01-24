/* Database definition */

module.exports = function(directory) {

  var database = {
    client: 'pg',
    connection: directory,
    searchPath: 'knex, public'
  };

  var knex = require('knex')(database);
  var bookshelf = require('bookshelf')(knex);

  return bookshelf;
};
