import dotenv from 'dotenv'
dotenv.config()

import { SequelizeAuto } from 'sequelize-auto'
import { Sequelize, DataTypes } from 'sequelize'
import Users from './models/users.js'
import Menu from './models/menu.js'
import WebSettings from './models/websettings.js'
import pg from 'pg'
const Client = pg.Client

const sequelize = new Sequelize(process.env.DB_URL, { dialectModule: pg })

const options = {
  directory: './src/models/',
}
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.Users = Users(sequelize, DataTypes)
db.Groups = Menu(sequelize, DataTypes)
db.Expenses = WebSettings(sequelize, DataTypes)
// db.sequelize.sync({ alter: true });

const auto = new SequelizeAuto(sequelize, null, null, options)
auto.run()
