import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import sequelize from './database.js'
import questionnaireRoutes from './routes/questionnaire.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')))

// PostgreSQL Connection Test
sequelize.authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL (Railway)'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err))

// API Routes
app.use('/api/questionnaire', questionnaireRoutes)

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Serve React app for all other routes (must be last)
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
