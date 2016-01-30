/* Lights routes */

module.exports = function(app, bookshelf) {

  var Light = require('../models/lights.js')(bookshelf);
  var Controllers = require('../models/controllers.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  /* General */

  app.get('/', function(request, response) {
    response.json({ message: 'Hello! Welcome to Lights.' });
  });

  /* GET */

  app.get('/lights', function(request, response) {
    if (!Validate.headers(request, response)) return;

    new Light()
      .fetchAll()
      .then(function(lights) {
        var controllerLights = [];

        lights.forEach(function(light) {
          if (Validate.controller(request, light)) { controllerLights.push(light); }
        });

        response.json(controllerLights);
      }).catch(function(error) {
        response.status(500).send(error.message);
      });
  });

  app.get('/lights/:id', function(request, response) {
    if (!Validate.headers(request, response)) return;

    new Light({ 'id' : request.params['id'] })
      .fetch()
      .then(function(light) {
        if (Validate.controller(request, light)) {
          response.json(light);
        } else {
          response.status(400).send({ error : 'The controller_id must be the same than the one in the light.' });
        }
      }).catch(function(error) {
        response.sendStatus(500);
      });
  });

  /* PUT */

  app.put('/lights/:id', function(request, response) {
    if (!Validate.headers(request, response)) return;

    new Light({ 'id' : request.params['id'] })
      .fetch()
      .then(function(light) {
        var body = request['body'];

        if (!Validate.validate(request.body, response, ['status', 'intensity', 'red', 'green', 'blue'])) {
          return;
        } else if (!Validate.controller(request, light)) {
          response.status(400).send({ error : 'The controller_id must be the same than the one in the light.' });
        } else {
          light.save({
            'updated' : new Date(),
            'status' : body['status'],
            'intensity' : parseFloat(body['intensity']),
            'red' : parseFloat(body['red']),
            'blue' : parseFloat(body['blue']),
            'green' : parseFloat(body['green'])
          }, { patch : true }).then(function(light) {
            response.json({ message: 'Cool story!', light: light });
          }).catch(function(error) {
            response.sendStatus(500);
          });
        }
      });
  });

  /* POST */

  app.post('/lights', function(request, response) {
    if (!Validate.headers(request, response)) return;

    if (request.headers['admin'] === "true") {
      var body = request['body'];

      new Controllers({ 'id' : request['headers']['controller_id'] }).fetch().then(function(controllers) {
        if (controllers != null) {
          new Light().query(function(query) { query.orderBy('id'); }).fetchAll().then(function(lights) {
            var lightID = parseInt(lights.last()['attributes']['id']) + 1 < lights.length ? lights.length : parseInt(lights.last()['attributes']['id']) + 1
            new Light({
              'id' : lightID,
              'controller_id' : parseFloat(request['headers']['controller_id']),
              'created' : new Date(),
              'updated' : new Date(),
              'status' : false,
              'intensity' : parseFloat(body['intensity']),
              'red' : parseFloat(body['red']),
              'blue' : parseFloat(body['blue']),
              'green' : parseFloat(body['green'])
            }).save(null, { method: 'insert' }).then(function(light) {
              response.json({ message: 'Cool story!', light: light });
            }).catch(function(error) {
              response.sendStatus(500);
            });
          });
        } else {
          response.sendStatus(400);
        }
      }).catch(function(error) {
        response.sendStatus(500);
      });
    } else {
      response.status(401).send('You are not an admin. 😠');
    }
  });

  /* DELETE */

  app.delete('/lights/:id', function(request, response) {
    if (request['headers']['admin'] === "true") {
      new Light({ 'id' : request['params']['id'] }).fetch().then(function(light) {
        if (parseInt(light['attributes']['controller_id']) === parseInt(request['headers']['controller_id'])) {
            light.destroy().then(function(light) {
              response.json({ message: "Success!" })
            }).catch(function(error) {
              response.sendStatus(500);
            });
        } else {
          response.sendStatus(400);
        }
      }).catch(function(error) {
        response.sendStatus(500);
      });
    } else {
      response.sendStatus(400);
    }
  });
};
