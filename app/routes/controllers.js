/* Controllers routes */

module.exports = function(app, bookshelf) {

  var Controllers = require('../models/controllers.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  /* GET */

  app.get('/controllers', function(request, response) {
    new Controllers()
    .fetchAll()
    .then(function(controllers) {
      var finalControllers = [];

      controllers.models.forEach(function(controller) {
        delete controller.attributes.token;
        finalControllers.push(controller.attributes);
      });

      response.json(finalControllers);
    }).catch(function(error) { Validate.server(error, response) });
  });

  app.get('/controllers/:id', function(request, response) {
    Validate.controllerRequest(request, response)
    .then(function() {
      new Controllers({ 'id' : request['params']['id'] })
      .fetch()
      .then(function(controller) {
        delete controller.attributes.token;
        response.json({ message : 'Cool story!', controller : controller });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* POST */

  app.post('/controllers', function(request, response) {
    Validate.admin(request, response)
    .then(function() {
      new Controllers()
      .fetchAll()
      .then(function(controllers) {
        var controllerID = 0;

        if (controllers.last() != undefined) {
          controllerID = parseInt(controllers.last().attributes['id']) + 1 < controllers.length ? controllers.length : parseInt(controllers.last().attributes['id']) + 1;
        }

        new Controllers({
          'id' : controllerID,
          'created' : new Date(),
          'updated' : new Date(),
          'token' : Math.random().toString(30).substring(2)
        }).save(null, { method : 'insert' }).then(function(controller) {
          response.json({ message : 'Created!', controller: controller });
        });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });

  /* DELETE */

  app.delete('/controllers/:id', function(request, response) {
    Validate.admin(request, response)
    .then(function() {
      return Validate.controllerRequest(request, response);
    })
    .then(function() {
      new Controllers({ 'id' : request['params']['id'] })
      .destroy()
      .then(function() {
        response.json({ message : 'Destroyed!' });
      }).catch(function(error) { Validate.server(error, response) });
    });
  });
};
