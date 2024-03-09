import dotenv from 'dotenv'
dotenv.config()

import { Sequelize } from 'sequelize'
import initModels from './models/init-models.js'
import pg from 'pg'

const sequelize = new Sequelize(process.env.DB_URL, { dialectModule: pg })

sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to DB'))
  .catch(err => console.log(err))

initModels(sequelize)

export default sequelize
