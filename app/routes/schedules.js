/* Schedule routes */

module.exports = function(app, bookshelf) {

  var Light = require('../models/lights.js')(bookshelf);
  var Schedule = require('../models/schedules.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  /* GET */

  app.get('/schedules/:id', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
      new Light({ 'id' : request['params']['id'] })
      .fetch()
      .then(function(light) {
        Validate.controller(request, light)
        .then(function() {
          new Schedule()
          .fetchAll()
          .then(function(schedules) {
            var lightSchedules = [];
            schedules.forEach(function(schedule) {
              if (schedule['attributes']['light_id'] == request['params']['id']) {
                lightSchedules.push(schedule);
              }
            });

            response.json({ message: "Cool story!", schedules: lightSchedules });
          }).catch(function(error) { Validate.server(error, response) });
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* POST */

  app.post('/schedules/:light_id', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
        return Validate.validate(request.body, response, ['schedule', 'status', 'intensity', 'red', 'green', 'blue']);
    })
    .then(function() {
      new Light({ 'id' : request['params']['light_id'] })
      .fetch()
      .then(function(light) {
        Validate.controller(request, light, response)
        .then(function() {
          new Schedule()
          .query(function(query) { query.orderBy('id'); })
          .fetchAll()
          .then(function(schedules) {
            var scheduleID = schedules.length

            if (schedules.length != 0) {
              scheduleID = parseInt(schedules.last()['attributes']['id']) + 1 < schedules.length ? schedules.length : parseInt(schedules.last()['attributes']['id']) + 1
            }

            new Schedule({
              'id' : scheduleID,
              'light_id' : parseInt(request['params']['light_id']),
              'created' : new Date(),
              'schedule' : new Date(request['body']['schedule']),
              'status' : request['body']['status'],
              'intensity' : parseFloat(request['body']['intensity']),
              'red' : parseFloat(request['body']['red']),
              'green' : parseFloat(request['body']['green']),
              'blue' : parseFloat(request['body']['blue'])
            }).save(null, { method: 'insert' })
            .then(function(schedule) {
              // TODO: Do the schedule to send it over.
              response.json({ message: "Success!", schedule: schedule })
            }).catch(function(error) { Validate.server(error, response) });
          }).catch(function(error) { Validate.server(error, response) });
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* DELETE */

  app.delete('/schedules/:id', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
        return Validate.validate(request.body, response, ['light_id']);
    })
    .then(function() {
      new Light({ 'id' : request['body']['light_id'] }).fetch().then(function(light) {
        Validate.controller(request, light, response)
        .then(function() {
          new Schedule({ 'id' : request['params']['id'] }).fetch().then(function(schedule) {
            if (parseInt(schedule['attributes']['light_id']) === parseInt(request['body']['light_id'])) {
              schedule.destroy().then(function() {
                response.json({ message: "Schedule destroyed!" });
                // TODO: Check the schedule.
              })
            } else {
              response.sendStatus(400);
            }
          }).catch(function(error) { Validate.server(error, response) });
        });
      }).catch(function(error) { Validate.server(error, response) });
    })
  });
}
