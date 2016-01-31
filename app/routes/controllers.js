/* Controllers routes */

module.exports = function(app, bookshelf) {

  var Controllers = require('../models/controllers.js')(bookshelf);

  /* GET */

  app.get('/controllers', function(request, response) {
    new Controllers().fetchAll().then(function(controllers) {
      response.json(controllers.toJSON());
    }).catch(function(error) { Validate.server(error, response) });
  });

  app.get('/controllers/:id', function(request, response) {
    if (parseInt(request['params']['id']) === parseInt(request['headers']['controller_id'])) {
      new Controllers({ 'id' : request['params']['id'] }).fetch().then(function(controller) {
        response.json({ message : 'Cool story!', controller : controller });
      }).catch(function(error) { Validate.server(error, response) });
    } else {
      response.sendStatus(400);
    }
  });

  /* POST */

  app.post('/controllers', function(request, response) {
    if (request['headers']['admin'] === "true") {
      new Controllers().fetchAll().then(function(controllers) {
        new Controllers({
          'id' : controllers.length,
          'created' : new Date(),
          'updated' : new Date()
        }).save(null, { method : 'insert' }).then(function(controller) {
          response.json({ message : 'Created!', controller: controller });
        });
      }).catch(function(error) { Validate.server(error, response) });
    } else {
      response.sendStatus(400);
    }
  });

  /* DELETE */

  app.delete('/controllers/:id', function(request, response) {
    if (request['headers']['admin'] === 'true' && request['params']['id'] === request['headers']['controller_id']) {
      new Controllers({ 'id' : request['params']['id'] }).destroy().then(function() {
        response.json({ message : 'Destroyed!' });
      }).catch(function(error) { Validate.server(error, response) });
    } else {
      response.sendStatus(400);
    }
  });
};
