/* Schedules model */

module.exports = function(bookshelf) {

  var Schedule = bookshelf.Model.extend({
      tableName: 'schedules'
  });

  return Schedule
};
