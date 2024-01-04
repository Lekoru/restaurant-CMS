var DataTypes = require("sequelize").DataTypes;
var _menu = require("./menu");
var _users = require("./users");
var _websettings = require("./websettings");

function initModels(sequelize) {
  var menu = _menu(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var websettings = _websettings(sequelize, DataTypes);


  return {
    menu,
    users,
    websettings,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
