import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import sequelize from './database.js'
import questionnaireRoutes from './routes/questionnaire.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const HOST = '0.0.0.0' // Required for Railway

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files from React build (if it exists)
const distPath = path.join(__dirname, '../dist')
console.log('📁 Static files path:', distPath)

// Check if dist folder exists
if (fs.existsSync(distPath)) {
  console.log('✅ dist folder found')
  app.use(express.static(distPath))
} else {
  console.warn('⚠️  dist folder not found - frontend may not be available')
}

// PostgreSQL Connection Test
let dbConnected = false
if (sequelize) {
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Connected to PostgreSQL (Railway)')
      dbConnected = true
    })
    .catch((err) => {
      console.error('❌ PostgreSQL connection error:', err.message)
      console.error('⚠️  Server will run but database operations will fail')
    })
} else {
  console.warn('⚠️  Database not configured - server running without database')
}

// API Routes
app.use('/api/questionnaire', questionnaireRoutes)

// Health check endpoint
app.get('/api/health', async (_req, res) => {
  const health = {
    status: 'ok',
    message: 'Server is running',
    database: sequelize ? (dbConnected ? 'connected' : 'disconnected') : 'not configured',
    timestamp: new Date().toISOString()
  }

  // Try to ping database
  if (sequelize && dbConnected) {
    try {
      await sequelize.authenticate()
      health.database = 'connected'
    } catch (err) {
      health.database = 'error'
      health.dbError = err.message
    }
  }

  res.json(health)
})

// Serve React app for all other routes (must be last)
app.use((_req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html')
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err)
      res.status(404).json({
        error: 'Frontend not built',
        message: 'Run "npm run build" to generate the frontend files'
      })
    }
  })
})

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
  console.log(`📁 Serving static files from: ${distPath}`)
})
