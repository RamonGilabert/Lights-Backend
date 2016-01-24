
module.export = function(app, bookshelf) {

  var Light = require('./app/models/lights.js')(bookshelf);

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

  /* POST */
}
