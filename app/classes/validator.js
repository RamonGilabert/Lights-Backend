
var Validator = function() {

  function checkUndefined(object) {
    var isUndefined = false

    if (object === undefined) return true

    for (var property in object) {
      if (property === undefined) {
        isUndefined = true
        break
      }
    }

    return isUndefined
  }

  function checkUndefinedKeys(object, keys) {
    var isUndefined = false

    if (object === undefined) return true

    for (var key in keys) {
      if (object[key] === undefined) {
        isUndefined = true
        break
      }
    }

    return isUndefined
  }
}
