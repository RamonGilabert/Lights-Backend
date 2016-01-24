/* Lights model */

module.exports = function(bookshelf) {

  var Light = bookshelf.Model.extend({
      tableName: 'lights'
  });

  return Light
};
