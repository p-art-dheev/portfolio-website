import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import geoip from 'geoip-lite'
import jwt from 'jsonwebtoken'
import { initializeDatabase, trackAnalytics, getAnalyticsStats } from './database.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Initialize database
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err)
})

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Analytics tracking endpoint
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { path } = req.body

    // Get IP (handling proxies)
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim()
    }
    // Clean IPv6 localhost or format
    if (ip === '::1' || ip === '::ffff:127.0.0.1') {
      ip = '127.0.0.1'
    }

    // Get country from IP
    let country = 'Unknown'
    if (ip !== '127.0.0.1') {
      const geo = geoip.lookup(ip)
      if (geo && geo.country) {
        country = geo.country
      }
    }

    const user_agent = req.headers['user-agent'] || 'Unknown'

    await trackAnalytics({
      ip,
      country,
      path: path || '/',
      user_agent
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    // Silently fail for the client so we don't disrupt their experience
    res.status(500).json({ success: false })
  }
})

// --- Admin Endpoints --- //

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' })
    res.json({ success: true, token })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
})

// Authentication middleware
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
      if (err) return res.status(403).json({ success: false, message: 'Invalid token' })
      req.user = user
      next()
    })
  } else {
    res.status(401).json({ success: false, message: 'No token provided' })
  }
}

app.get('/api/admin/stats', requireAuth, async (req, res) => {
  try {
    const { timeframe, page = 1, limit = 20 } = req.query; // '7days', '30days', 'all'
    const stats = await getAnalyticsStats(
      timeframe || '30days',
      parseInt(page, 10),
      parseInt(limit, 10)
    )
    res.json({ success: true, data: stats })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' })
  }
})

// ----------------------- //

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Portfolio VibeCode API is running!' })
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      })
    }

    // Log the contact form submission (in production, send email)
    console.log('Contact form submission:', { name, email, message })

    // TODO: Implement email sending with nodemailer
    // For now, just return success
    res.json({
      success: true,
      message: 'Message received successfully!'
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    })
  }
})

// Get GitHub contributions (mock data)
app.get('/api/github/contributions', (req, res) => {
  const contributions = []
  for (let i = 0; i < 365; i++) {
    contributions.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20),
      level: Math.floor(Math.random() * 5)
    })
  }
  res.json({ success: true, data: contributions })
})

// Get projects
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React and Node.js',
      tags: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/username/project1',
      demo: 'https://project1-demo.com'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Intuitive task manager with real-time collaboration',
      tags: ['Vue.js', 'Firebase', 'Tailwind'],
      github: 'https://github.com/username/project2',
      demo: 'https://project2-demo.com'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time data visualization and reporting tool',
      tags: ['React', 'D3.js', 'Express'],
      github: 'https://github.com/username/project3',
      demo: 'https://project3-demo.com'
    },
    {
      id: 4,
      title: 'AI Chatbot',
      description: 'ML-powered conversational assistant',
      tags: ['Python', 'TensorFlow', 'FastAPI'],
      github: 'https://github.com/username/project4',
      demo: 'https://project4-demo.com'
    }
  ]
  res.json({ success: true, data: projects })
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
})
