import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './database.js'
import questionnaireRoutes from './routes/questionnaire.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// PostgreSQL Connection Test
sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL (Railway)'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err))

// Routes
app.use('/api/questionnaire', questionnaireRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
