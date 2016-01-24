var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

var Light = sequelize.define('light', {
  ID: Sequelize.FLOAT,
  controller_ID: Sequelize.FLOAT,
  status: Sequelize.BOOLEAN,
  intensity: Sequelize.FLOAT,
  red: Sequelize.FLOAT,
  green: Sequelize.FLOAT,
  blue: Sequelize.FLOAT
});
