/* Controllers routes */

module.exports = function(app, bookshelf) {

  var Controllers = require('../models/controllers.js')(bookshelf);

  /* GET */

  app.get('/controllers', function(request, response) {
    new Controllers().fetchAll().then(function(controllers) {
      response.json(controllers.toJSON());
    }).catch(function(error) {
      response.sendStatus(500);
    });
  });

  app.get('/controllers/:id', function(request, response) {
    if (parseInt(request['params']['id']) === parseInt(request['headers']['controller_id'])) {
      new Controllers({ 'id' : request['params']['id'] }).fetch().then(function(controller) {
        response.json({ message : 'Cool story!', controller : controller })
      }).catch(function(error) {
        response.sendStatus(500);
      });
    } else {
      response.sendStatus(400);
    }
  });

  /* POST */

  app.post('/controllers', function(request, response) {

  });
};
