import { motion, AnimatePresence } from 'framer-motion'
import { FaFileAlt, FaEnvelope, FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import StatusWidget from './widgets/StatusWidget'
import MusicWidget from './widgets/MusicWidget'
import QuoteWidget from './widgets/QuoteWidget'
import EducationWidget from './widgets/EducationWidget'
import { config } from '../config'

const GREETINGS = [
  'Hi', 'Hola', 'नमस्ते', 'Bonjour', 'Ciao',
  'Olá', 'こんにちは', '안녕', 'வணக்கம்',
  'مرحبا', 'Привет',
]

const Hero = () => {
  const [greetIndex, setGreetIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % GREETINGS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="home" className="py-2 flex items-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-4 auto-rows-[minmax(80px,auto)]"
      >
        {/* Main Hero Card */}
        <motion.div
          variants={item}
          className="glass-card col-span-1 md:col-span-8 lg:col-span-7 row-span-3 p-6 md:p-8 flex items-center gap-6"
        >
          <div className="flex-1">
            {/* Greeting */}
            <div className="h-7 md:h-8 mb-3 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl md:text-3xl font-semibold opacity-60 theme-greeting"
                  style={{ fontFamily: "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Tamil', 'Noto Sans Arabic', 'Space Grotesk', sans-serif" }}
                >
                  {GREETINGS[greetIndex]} 
                </motion.span>
              </AnimatePresence>
            </div>

            {/* I'm + Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="theme-greeting">I'm </span>
              <span className="theme-name">{config.personal.name}</span>
            </h1>

            {/* Tagline pill */}
            <div className="mb-3 px-4 py-1.5 theme-surface border theme-border rounded-md inline-block max-w-fit">
              <p className="text-xs theme-text-sub font-mono font-medium opacity-70" style={{ letterSpacing: '0.08em', fontVariant: 'small-caps' }}>
                {config.personal.tagline || config.personal.title}
              </p>
            </div>

            {/* Role */}
            <p className="text-sm md:text-base font-sans font-medium theme-text-sub opacity-70 mb-5">
              {config.personal.title}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/assets/resume/Pardheev_s_Resume.pdf', '_blank')}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-500/20 border border-primary-500/30 rounded-xl theme-text font-display font-semibold text-sm transition-all"
              >
                <FaFileAlt />
                <span>Read Resume</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) {
                    window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' })
                  }
                }}
                className="btn-secondary flex items-center gap-2 text-sm font-display font-semibold"
              >
                <FaEnvelope />
                <span>Contact</span>
              </motion.button>
            </div>
          </div>

          {/* Profile Picture */}
          <motion.div
            className="flex w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl items-center justify-center relative flex-shrink-0 md:flex-shrink-0 mx-auto md:mx-0 mb-6 md:mb-0"
          >
            {/* Pulsing outer ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-3xl border-2 border-primary-500/30"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Multi-layered animated border */}
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary-500/50">
              <div className="w-full h-full rounded-2xl bg-dark-500 relative overflow-hidden">
                {/* Inner glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    border: '2px solid rgba(16, 185, 129, 0.6)',
                    boxShadow: 'inset 0 0 30px rgba(16, 185, 129, 0.2)',
                  }}
                  animate={{
                    boxShadow: [
                      'inset 0 0 30px rgba(16, 185, 129, 0.2)',
                      'inset 0 0 50px rgba(16, 185, 129, 0.4)',
                      'inset 0 0 30px rgba(16, 185, 129, 0.2)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {config.personal.profileImage ? (
                  <img
                    src={config.personal.profileImage}
                    alt={config.personal.name}
                    className="w-full h-full object-cover relative z-10 rounded-2xl"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <FaUser className="text-5xl lg:text-6xl text-white/90 absolute inset-0 flex items-center justify-center z-10" />
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sidebar widgets */}
        <motion.div variants={item} className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1">
          <StatusWidget />
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1">
          <EducationWidget />
        </motion.div>

        <motion.div variants={item} className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1">
          <MusicWidget />
        </motion.div>

        {/* Quote */}
        <motion.div variants={item} className="col-span-1 md:col-span-8 lg:col-span-10 row-span-1">
          <QuoteWidget />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
