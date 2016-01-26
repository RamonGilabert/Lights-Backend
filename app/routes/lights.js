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
    new Light({ 'controller_id' : request['headers']['controller_id'] }).fetch().then(function(lights) {
      if (lights === null) {
        response.json({});
      } else {
        response.json(lights.toJSON());
      }
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
    })
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
          'status' : body['status'],
          'intensity' : parseFloat(body['intensity']),
          'red' : parseFloat(body['red']),
          'blue' : parseFloat(body['blue']),
          'green' : parseFloat(body['green'])
        }, { patch : true }).then(function(light) {
          response.json({ message: 'Cool story!', light: light });
        });
      }
    });
  });

  /* POST */

  app.post('/lights', function(request, response) {

  });
};
