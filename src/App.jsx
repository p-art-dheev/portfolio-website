import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import ConnectSection from './components/ConnectSection'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import ScrollToTop from './components/ScrollToTop'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import { useAnalytics } from './hooks/useAnalytics'
import { Analytics } from '@vercel/analytics/react'

function Portfolio({ darkMode, toggleTheme }) {
  useAnalytics()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="relative z-10">
      {/* Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-green-500 z-[100] origin-left shadow-[0_0_10px_rgba(34,197,94,0.8)] pointer-events-none"
        style={{ scaleX }}
      />

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-6 pb-12"
        >
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <ConnectSection />
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="relative min-h-screen" style={{ overflowX: 'clip' }}>
      {/* Grid Overlay */}
      <div className="grid-overlay" />

      {/* Content */}
      <Routes>
        <Route path="/" element={<Portfolio darkMode={darkMode} toggleTheme={toggleTheme} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Vercel Analytics — tracks all page views automatically */}
      <Analytics />
    </div>
  )
}

export default App
