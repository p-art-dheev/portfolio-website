import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import ConnectSection from './components/ConnectSection'
import ScrollToTop from './components/ScrollToTop'

function Portfolio({ darkMode, toggleTheme }) {
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
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#059669] via-[#0d9488] to-[#077DE6] z-[100] origin-left shadow-[0_0_10px_rgba(5,150,105,0.8)] pointer-events-none"
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

      {/* Content */}
      <Routes>
        <Route path="/" element={<Portfolio darkMode={darkMode} toggleTheme={toggleTheme} />} />
      </Routes>
    </div>
  )
}

export default App
