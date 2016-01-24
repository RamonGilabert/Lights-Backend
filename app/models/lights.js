/* Lights model */

var database = require('../database/schema.js');

var Light = database.bookshelf.Model.extend({
    tableName: 'lights'
});
