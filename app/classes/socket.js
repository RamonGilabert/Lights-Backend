/* Socket handler */

module.exports = function(server) {
  var io = require('socket.io')(server);

  io.on('connection', function(socket) {
    console.log('Something connected to the socket.');

    socket.on('ios-light', function(light) {
      socket.emit('light-' + light.controllerID, { light: light });
      // TODO: Edit values in the DB.
    });

    socket.on('server-light', function(light) {
      socket.emit('ios-light-' + light.controllerID, { light: light });
      // TODO: Edit values in the DB.
    });
  });
};
