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
        light['id'] = body['id'];
        light['controller_id'] = body['controller_id'];
        light['status'] = body['status'];
        light['intensity'] = body['intensity'];
        light['red'] = body['red'];
        light['blue'] = body['blue'];
        light['green'] = body['green'];

        console.log(light);

        response.json({ message: 'Cool story!', light: light });
      }
    });
  });

  // TODO: Put the puts here.
};
