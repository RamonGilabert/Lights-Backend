/* Socket handler */

module.exports = function(server, bookshelf) {

  var io = require('socket.io')(server);
  var Controller = require('../models/controllers.js')(bookshelf);
  var Light = require('../models/lights.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  io.on('connection', function(socket) {
    console.log('Something connected to the socket.');

    socket.on('ios-light', function(light) {
      new Controller({ 'id' : light['controller_id'] })
      .fetch()
      .then(function(bookshelfController) {
        new Light({ 'id' : light.id })
        .fetch()
        .then(function(bookshelfLight) {
          if (parseInt(bookshelfLight.attributes['controller_id']) === parseInt(light['controller_id'])
          && String(light.token) === String(bookshelfLight.attributes['token'])
          && String(light['controller_token']) === String(bookshelfController.attributes['token'])) {
            socket.broadcast.emit('light-' + light['controller_id'], { light: light });

            bookshelfLight.save({
              'updated' : new Date(),
              'status' : light.status,
              'intensity' : light.intensity,
              'red' : light.red,
              'blue' : light.blue,
              'green' : light.green
            }, { patch : true })
          }
        });
      });
    });

    socket.on('server-light', function(light) {
      new Light({ 'id' : light.id })
      .fetch()
      .then(function(bookshelfLight) {
        if (parseInt(bookshelfLight.attributes['controller_id']) === parseInt(light.controllerID) && String(light.token) === String(bookshelfLight.attributes['token'])) {
          socket.broadcast.emit('ios-light-' + light.controllerID, { light: light });

          bookshelfLight.save({
            'updated' : new Date(),
            'status' : light.status,
            'intensity' : light.intensity,
            'red' : light.red,
            'blue' : light.blue,
            'green' : light.green
          }, { patch : true })
        }
      });
    });

    socket.on('new-ios-light', function(light) {
      socket.broadcast.emit('new-ios-light-' + light.light['controller_id'], { light: light.light });
    });

    socket.on('delete-ios-light', function(light) {
      socket.broadcast.emit('delete-ios-light-' + light.light['controller_id'], { light: light.light });
    });
  });
};
