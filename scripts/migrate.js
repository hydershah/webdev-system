import sequelize from '../server/database.js'
import Questionnaire from '../models/Questionnaire.js'

async function runMigration() {
  try {
    console.log('🔄 Connecting to PostgreSQL...')
    await sequelize.authenticate()
    console.log('✅ Connected to PostgreSQL')

    console.log('🔄 Running migrations...')
    await sequelize.sync({ alter: true })
    console.log('✅ Database synced successfully!')

    console.log('📊 Checking tables...')
    const tables = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'",
      { type: sequelize.QueryTypes.SELECT }
    )
    console.log('Tables created:', tables.map(t => t.table_name))

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
