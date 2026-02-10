import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import ConnectSection from './components/ConnectSection'
import ScrollToTop from './components/ScrollToTop'
import ParticleBackground from './components/ParticleBackground'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setDarkMode(false)
      document.body.classList.add('light')
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.body.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <div className="relative min-h-screen" style={{ overflowX: 'clip' }}>
      {/* Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-2">
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
        
        <ScrollToTop />
      </div>
    </div>
  )
}

export default App
