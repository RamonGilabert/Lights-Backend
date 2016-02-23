/* Lights routes */

module.exports = function(app, bookshelf) {

  var io = require('socket.io-client');
  var socket = io.connect('http://localhost:5000', { reconnect: true });
  var Light = require('../models/lights.js')(bookshelf);
  var Controllers = require('../models/controllers.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  /* General */

  app.get('/', function(request, response) {
    response.json({ message: 'Hello! Welcome to Lights.' });
  });

  /* GET */

  app.get('/lights', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
      new Light()
      .fetchAll()
      .then(function(lights) {
        var controllerLights = [];

        lights.forEach(function(light) {
          if (Validate.controllers(request, light)) {
            delete light.attributes.token;
            controllerLights.push(light);
          }
        });

        response.json(controllerLights);
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  app.get('/lights/:id', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
      new Light({ 'id' : request.params['id'] })
      .fetch()
      .then(function(light) {
        Validate.controller(request, light, response).then(function() {
          delete light.attributes.token;
          response.json(light);
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* PUT */

  app.put('/lights/:id', function(request, response) {
    Validate.headers(request, response)
    .then(function() {
      return Validate.validate(request.body, response, ['status', 'intensity', 'red', 'green', 'blue']);
    })
    .then(function() {
      new Light({ 'id' : request.params['id'] })
      .fetch()
      .then(function(light) {
        var body = request['body'];

        Validate.controller(request, light, response)
        .then(function() {
          light.save({
            'updated' : new Date(),
            'status' : body['status'],
            'intensity' : parseFloat(body['intensity']),
            'red' : parseFloat(body['red']),
            'blue' : parseFloat(body['blue']),
            'green' : parseFloat(body['green'])
          }, { patch : true })
          .then(function(light) {
            response.json({ message: 'Cool story!', light: light });
          }).catch(function(error) { Validate.server(error, response) });
        });
      });
    });
  });

  /* POST */

  app.post('/lights', function(request, response) {
    Validate.admin(request, response)
    .then(function() {
      return Validate.headers(request, response)
    })
    .then(function() {
      var body = request['body'];

      new Controllers({ 'id' : request.headers['controller_id'] })
      .fetch()
      .then(function(controllers) {
        new Light()
        .query(function(query) { query.orderBy('id'); })
        .fetchAll()
        .then(function(lights) {
          var lightID = 0;

          if (lights.last() != undefined) {
            lightID = parseInt(lights.last().attributes['id']) + 1 < lights.length ? lights.length : parseInt(lights.last().attributes['id']) + 1;
          }

          new Light({
            'id' : lightID,
            'controller_id' : parseFloat(request.headers['controller_id']),
            'created' : new Date(),
            'updated' : new Date(),
            'status' : false,
            'intensity' : 1,
            'red' : 1,
            'blue' : 1,
            'green' : 1,
            'token' : Math.random().toString(30).substring(2),
            'address' : body['address']
          }).save(null, { method: 'insert' }).then(function(light) {
            socket.emit('new-ios-light', { light: light });
            response.json({ message: 'Cool story!', light: light.attributes });
          }).catch(function(error) { Validate.server(error, response) });
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* DELETE */

  app.delete('/lights/:id', function(request, response) {
    Validate.admin(request, response)
    .then(function() {
      Validate.headers(request, response)
    })
    .then(function() {
      new Light({ 'id' : request.params['id'] })
      .fetch()
      .then(function(light) {
        Validate.controller(request, light, response)
        .then(function() {
          socket.emit('delete-ios-light', { light: light.attributes });
          light.destroy().then(function() {
            response.json({ message: "Success!" })
          }).catch(function(error) {
            response.status(500).send(error.message);
          });
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });
};
