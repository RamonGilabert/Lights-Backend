/* Controllers routes */

module.exports = function(app, bookshelf) {

  var Controllers = require('../models/controllers.js')(bookshelf);

  app.get('/controllers', function(request, response) {
    new Controllers().fetchAll().then(function(controllers) {
      response.json(controllers.toJSON());
    });
  });
};
