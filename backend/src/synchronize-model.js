import dotenv from 'dotenv'
import pg from 'pg'
const Client = pg.Client
dotenv.config()

import { Sequelize, DataTypes } from 'sequelize'

import Users from './models/users.js'
import Menu from './models/menu.js'
import webSettings from './models/websettings.js'

const sequelize = new Sequelize(process.env.DB_URL, {
  dialectModule: pg,
})

async function connTest() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully')
  } catch (e) {
    console.error('Unable to connect to the database: ', e)
  }
}

connTest()

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  users: Users(sequelize, DataTypes),
  menu: Menu(sequelize, DataTypes),
  webSettings: webSettings(sequelize, DataTypes),
  options: {
    dialect: 'postgres',
    dialectModule: pg,
    ssl: true,
  },
}
db.sequelize.sync({ alter: true })
