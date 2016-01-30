
module.exports = {

  validate: function(object, keys) {
    var errors = [];
    var statusCode = 200;

    for (var key in keys) {
      if (object[key] === undefined) {
        errors.push(key + ' cannot be undefined.');
        statusCode = 400;
      }
    }

    return { errors: errors, statusCode: statusCode };
  }

  validateHeaders: function(object) {
    var errors = [];
    var statusCode = 200;

    if (object['Content-Type'] === undefined) {
      errors.push('Content-Type cannot be undefined.')
    }

    if (parseInt(object['controller_id']) === undefined) {
      errors.push('controller_id cannot be undefined.')
    }
  }

  handleError: function(response, error) {
    response.json()
  }

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
