import {DataTypes} from "sequelize";
import Menu from "./menu.js";
import Users from "./users.js";
import Websettings from "./websettings.js";

function initModels(sequelize) {
  const menu = Menu(sequelize, DataTypes);
  const users = Users(sequelize, DataTypes);
  const websettings = Websettings(sequelize, DataTypes);


  return {
    menu,
    users,
    websettings,
  };
}
export default initModels;
