/* Controllers routes */

module.exports = function(app, bookshelf) {

  var Controllers = require('../models/controllers.js')(bookshelf);

  /* GET */

  app.get('/controllers', function(request, response) {
    new Controllers().fetchAll().then(function(controllers) {
      response.json(controllers.toJSON());
    });
  });

  /* POST */

  app.post('/controllers', function(request, response) {

  });
};
