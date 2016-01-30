
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
      if (request.headers['admin'] === "true" || request.headers['admin']) {
        resolve();
      } else {
        response.status(401).send({ error : 'You are not an admin. 😠' });
        reject();
      }
    });
  },

  checkUndefined: function(object) {
    var isUndefined = false

    if (object === undefined) return true

    for (var property in object) {
      if (property === undefined) {
        isUndefined = true
        break
      }
    }

    return isUndefined
  },

  checkUndefinedKeys: function(object, keys) {
    var isUndefined = false

    if (object === undefined) return true

    for (var key in keys) {
      if (object[key] === undefined) {
        isUndefined = true
        break
      }
    }

    return isUndefined
  },

  checkUndefinedObject: function(object, attributes) {
    var isUndefined = false

    if (object === undefined) return true

    for (var index in Object.keys(attributes)) {
      var key = Object.keys(attributes)[index];

      if (object[key] === undefined && key != "created" && key != "updated") {
        isUndefined = true
        break
      }
    }

    return isUndefined
  }
}
