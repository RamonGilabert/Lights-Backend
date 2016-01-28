/* Schedule routes */

module.exports = function(app, bookshelf) {

  var Light = require('../models/lights.js')(bookshelf);
  var Schedule = require('../models/schedules.js')(bookshelf);
  var Validator = require('../classes/validator.js');

  // GET

  app.get('/schedules/:id', function(request, response) {
    // TODO: Show the schedules for that time.
  });

  // POST

  app.post('/schedules', function(request, response) {
    new Light({ 'id' : request['body']['light_id'] }).fetch().then(function(light) {
      if (parseInt(request['headers']['controller_id']) === parseInt(light['attributes']['id'])) {
        new Schedule().query(function(query) { query.orderBy('id'); }).fetchAll().then(function(schedules) {
          var scheduleID = schedules.length

          if (schedules.length != 0) {
            scheduleID = parseInt(schedules.last()['attributes']['id']) + 1 < schedules.length ? schedules.length : parseInt(schedules.last()['attributes']['id']) + 1
          }

          new Schedule({
            'id' : scheduleID,
            'light_id' : parseInt(request['body']['light_id']),
            'created' : new Date(),
            'schedule' : new Date(request['body']['schedule']),
            'status' : request['body']['status'],
            'intensity' : parseFloat(request['body']['intensity']),
            'red' : parseFloat(request['body']['red']),
            'green' : parseFloat(request['body']['green']),
            'blue' : parseFloat(request['body']['blue'])
          }).save(null, { method: 'insert' }).then(function(schedule) {
            response.json({ message: "Success!", schedule: schedule })
          }).catch(function(error) {
            response.sendStatus(500);
          });
        }).catch(function() {
          response.sendStatus(500);
        });
        // TODO: Do the schedule to send it over.
      } else {
        response.sendStatus(400);
      }
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });
}
