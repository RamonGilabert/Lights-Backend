
module.exports = {
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
