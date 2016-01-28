/* Schedule routes */

module.exports = function(app, bookshelf) {

  app.get('/schedule', function(request, response) {
    // TODO: Show the schedules for that time.
  });

  app.post('/schedule/:id', function(request, response) {
    new Light({ 'id' : request['headers']['controller_id'] }).fetch().then(function(light) {
      // TODO: Do the schedule to send it over.
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });
}
