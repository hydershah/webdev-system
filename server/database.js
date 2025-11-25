import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let sequelize = null

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  })
} else {
  console.warn('⚠️  DATABASE_URL not set - database features will be unavailable')
}

export default sequelize
