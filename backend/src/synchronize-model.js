import dotenv from "dotenv";
dotenv.config()

import {Sequelize, DataTypes} from "sequelize";

import Users from "./models/Users.js";
import Menu from "./models/Menu.js";
import webSettings from "./models/WebSettings.js";


const sequelize = new Sequelize(process.env.DB_URL, {dialect: 'postgres'});

async function connTest() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (e) {
        console.error("Unable to connect to the database: ", e);
    }
}

connTest();

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    users: Users(sequelize, DataTypes),
    menu: Menu(sequelize, DataTypes),
    webSettings: webSettings(sequelize, DataTypes),
    options: {
        dialect: 'postgres',
        ssl: true
    }
};
db.sequelize.sync({ alter: true });
