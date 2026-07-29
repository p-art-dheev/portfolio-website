import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { IoSunny } from 'react-icons/io5'
import { config } from '../config'
import { useLocation, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About Me', path: '/' },
  { id: 'projects', label: 'Projects', path: '/' },
  { id: 'socials', label: 'Socials', path: '/' },
  { id: 'artworks', label: 'Artworks', path: '/artworks' },
]

const Navbar = ({ darkMode, toggleTheme }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // If we just navigated to home with a scroll target
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo)
        if (element) {
          window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' })
        }
        // clear state
        window.history.replaceState({}, document.title)
      }, 100)
    }
  }, [location])

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.replace('/', ''))
      return
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const scrollPosition = window.scrollY + 150
      NAV_LINKS.forEach(({ id }) => {
        const section = document.getElementById(id)
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const scrollToSection = useCallback((id, path) => {
    if (path && path !== location.pathname) {
      if (path === '/') {
        navigate('/', { state: { scrollTo: id } })
      } else {
        navigate(path)
      }
    } else {
      if (id === 'artworks') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const element = document.getElementById(id)
        if (element) {
          window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' })
        }
      }
    }
    setIsMobileMenuOpen(false)
  }, [location.pathname, navigate])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-[100] mx-auto w-full max-w-6xl px-4 md:px-8 lg:px-12 pt-3 pb-2 transition-all duration-300"
    >
      <div className={`glass-card px-5 py-3 ${isScrolled ? 'shadow-2xl' : ''}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="font-mono text-sm font-semibold cursor-pointer border-2 px-3 py-1.5 rounded-lg theme-text theme-border hover:border-primary-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            <span>
              {config.personal.website ? (
                <>
                  {config.personal.website.split('.')[0]}
                  <span className="text-primary-500">
                    .{config.personal.website.split('.').slice(1).join('.')}
                  </span>
                </>
              ) : (
                <>
                  portfolio<span className="text-primary-500">.dev</span>
                </>
              )}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id, link.path)}
                className={`relative font-medium transition-colors duration-300 ${activeSection === link.id
                  ? 'text-primary-500'
                  : 'theme-text-sub hover:text-primary-500'
                  }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-lg transition-shadow"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <FaMoon className="text-primary-500" />
                  ) : (
                    <IoSunny className="text-yellow-500 text-xl" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-full glass-card flex items-center justify-center text-lg"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t theme-border"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id, link.path)}
                  className={`text-left font-medium py-2 transition-colors ${activeSection === link.id
                    ? 'text-primary-500'
                    : 'theme-text-sub hover:text-primary-500'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
