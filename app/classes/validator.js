
module.exports = {

  validate: function(request, response, keys) {
    return new Promise(function(resolve, reject) {
      var errors = [];

      keys.forEach(function(key) {
        if (request[key] === undefined) {
          errors.push(key + ' cannot be undefined.');
        }
      });

      if (errors.length > 0) {
        response.status(400).send({ error: errors });
        reject();
      } else {
        resolve();
      }
    });
  },

  headers: function(request, response) {
    return this.validate(request.headers, response, ['content-type', 'controller_id']);
  },

  controllers: function(request, light) {
    return (parseInt(light.attributes['controller_id']) === parseInt(request.headers['controller_id']));
  },

  controller: function(request, light, response) {
    return new Promise(function(resolve, reject) {
      var value = parseInt(light.attributes['controller_id']) === parseInt(request.headers['controller_id']);

      if (value) {
        resolve();
      } else {
        response.status(400).send({ error : 'The controller_id must be the same than the one in the light.' })
        reject();
      }
    });
  },

  admin: function(request, response) {
    return new Promise(function(resolve, reject) {
      if (request.headers['admin'] === "true") {
        resolve();
      } else {
        response.status(401).send({ error : 'You are not an admin. 😠' });
        reject();
      }
    });
  }
}
