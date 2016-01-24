/* Controllers model */

module.exports = function(bookshelf) {

  var Controllers = bookshelf.Model.extend({
    tableName: 'controllers'
  });

  return Controllers
};
