/* Lights routes */

module.exports = function(app, bookshelf) {

  var Light = require('../models/lights.js')(bookshelf);
  var Validator = require('../classes/validator.js');

  /* General */

  app.get('/', function(request, response) {
    response.json({ message: 'Hello! Welcome to Lights.' });
  });

  /* GET */

  app.get('/lights', function(request, response) {
    new Light().fetchAll().then(function(lights) {
      var controllerLights = [];

      lights.forEach(function(light) {
        if (parseFloat(light['attributes']['controller_id']) === parseFloat(request['headers']['controller_id'])) {
            controllerLights.push(light);
        }
      });

      if (lights === null) {
        response.json({});
      } else {
        response.json(controllerLights);
      }
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });

  app.get('/lights/:id', function(request, response) {
    new Light({ 'id' : request['params']['id'] }).fetch().then(function(light) {

      if (light === null) {
        response.json({});
      } else if (request['headers']['controller_id'] != light.attributes['controller_id']) {
        response.sendStatus(400);
      } else {
        response.json(light.toJSON());
      }
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });

  /* PUT */

  app.put('/lights/:id', function(request, response) {
    new Light({ 'id' : request['params']['id'] }).fetch().then(function(light) {
      var body = request['body'];

      if (Validator.checkUndefinedObject(body, light.attributes)
      || request['headers']['controller_id'] != light.attributes['controller_id']) {
        response.sendStatus(401);
      } else {
        light.save({
          'status' : Boolean(body['status']),
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
    if (request['headers']['admin'] != undefined && Boolean(request['headers']['admin']) === true) {
      var body = request['body'];

      new Light().fetchAll().then(function(lights) {
        new Light({
          'id' : lights.length,
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
        })
      }).catch(function(error) {
        response.sendStatus(500);
      });
    } else {
      response.sendStatus(400);
    }
  });

  /* DELETE */

  app.delete('/lights/:id', function(request, response) {
    if (request['headers']['admin'] != undefined && request['headers']['admin'] === true) {

    }
  });
};
