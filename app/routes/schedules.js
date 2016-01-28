/* Schedule routes */

module.exports = function(app, bookshelf) {

  var Schedyle = require('../models/schedules.js')(bookshelf);

  // GET

  app.get('/schedule', function(request, response) {
    // TODO: Show the schedules for that time.
  });

  // POST

  app.post('/schedule/:id', function(request, response) {
    new Light({ 'id' : request['headers']['controller_id'] }).fetch().then(function(light) {
      // TODO: Do the schedule to send it over.
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });
}
