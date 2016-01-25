/* Lights routes */

module.exports = function(app, bookshelf) {

  var Light = require('../models/lights.js')(bookshelf);

  /* General */

  app.get('/', function(request, response) {
    response.json({ message: 'Hello! Welcome to Lights.' });
  });

  /* GET */

  app.get('/lights', function(request, response) {
    new Light().fetchAll().then(function(lights) {
      response.json(lights.toJSON());
    });
  });

  /* PUT */

  app.put('/lights/:id', function(request, response) {
    new Light({ 'id' : request['params']['id'] }).fetch().then(function(light) {
      var body = request['body'];

      if (body === undefined || body['id'] === undefined || body['controller_id'] === undefined
      || body['status'] === undefined || body['intensity'] === undefined
      || body['red'] === undefined || body['green'] === undefined || body['blue'] === undefined) {
        response.sendStatus(400);
      } else {
        light.save({
          'controller_id' : parseInt(body['controller_id']),
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

  // TODO: Put the puts here.
};
