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
    console.log(request['params']['id']);
    new Light({ 'id' : request['params']['id'] }).fetch().then(function(lights) {
      response.json({ message: 'Cool story!', light: lights });
    });
  });

  // TODO: Put the puts here.
};
