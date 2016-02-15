/* Socket handler */

module.exports = function(server, bookshelf) {

  var io = require('socket.io')(server);
  var Light = require('../models/lights.js')(bookshelf);
  var Validate = require('../classes/validator.js');

  io.on('connection', function(socket) {
    console.log('Something connected to the socket.');

    socket.on('ios-light', function(light) {
      new Light()
      .fetch({ 'id' : light.id })
      .then(function(bookshelfLight) {
        if (parseInt(bookshelfLight.attributes['controller_id']) === parseInt(light.controllerID) && light.token == bookshelfLight.token) {
          socket.emit('light-' + light.controllerID, { light: light });

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

    socket.on('server-light', function(light) {
      new Light()
      .fetch({ 'id' : light.id, 'token' : light.token })
      .then(function(bookshelfLight) {
        if (parseInt(bookshelfLight.attributes['controller_id']) === parseInt(light.controllerID)) {
          socket.emit('ios-light-' + light.controllerID, { light: light });

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
};
