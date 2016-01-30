
module.exports = {

  validate: function(request, response, keys) {
    var errors = [];
    keys.forEach(function(key) {
      if (request[key] === undefined) {
        errors.push(key + ' cannot be undefined.');
      }
    });

    if (errors.length > 0) {
      response.status(400).send({ error: errors });
    }

    return (errors.length === 0);
  },

  headers: function(request, response) {
    return this.validate(request.headers, response, ['content-type', 'controller_id']);
  },

  controller: function(request, light) {
    return (parseInt(light.attributes['controller_id']) === parseInt(request.headers['controller_id']));
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
