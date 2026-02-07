import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
