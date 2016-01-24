var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LightSchema = new Schema({
  ID: Number,
  controller_ID: Number,
  created: Date,
  updated: Date,
  status: Boolean,
  intensity: Number,
  red: Number,
  green: Number,
  blue: Number
});

module.exports = mongoose.model('Light', LightSchema);
