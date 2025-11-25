import sequelize from '../server/database.js'
import Questionnaire from '../models/Questionnaire.js'

async function runMigration() {
  try {
    console.log('🔄 Connecting to PostgreSQL...')

    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL environment variable is not set')
      process.exit(1)
    }

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
    console.error('❌ Migration failed:', error.message)
    console.error('Full error:', error)
    console.log('\n⚠️  Server will start anyway, but database operations may fail')
    // Exit with 0 to allow server to start
    process.exit(0)
  }
}

runMigration()
