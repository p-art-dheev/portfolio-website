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
                  className="text-xl md:text-2xl font-normal opacity-60 theme-text"
                  style={{ fontFamily: "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Tamil', 'Noto Sans Arabic', 'Space Grotesk', sans-serif" }}
                >
                  {GREETINGS[greetIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* I'm + Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-4" style={{ letterSpacing: '-0.02em' }}>
              <span className="theme-text">I'm </span>
              <span className="text-primary-500">{config.personal.name}</span>
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
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-500/20 border border-primary-500/30 rounded-xl text-primary-500 font-display font-semibold text-sm transition-all"
              >
                <FaFileAlt />
                <span>Read Resume</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2 text-sm font-display font-semibold"
              >
                <FaEnvelope />
                <span>Contact</span>
              </motion.button>
            </div>
          </div>

          {/* Profile Picture */}
          {/* Profile Picture */}
          <motion.div
            className="hidden md:flex w-56 h-56 lg:w-64 lg:h-64 rounded-3xl bg-white/5 border border-white/10 p-2 items-center justify-center relative flex-shrink-0 shadow-2xl"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              {config.personal.profileImage ? (
                <img
                  src={config.personal.profileImage}
                  alt={config.personal.name}
                  className="w-full h-full object-cover z-10"
                />
              ) : (
                <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <FaUser className="text-6xl lg:text-7xl text-white/90 z-10" />
                </div>
              )}
            </div>

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                border: '1px solid rgba(0, 225, 135, 0.3)',
                boxShadow: '0 0 15px rgba(0, 225, 135, 0.05)',
              }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(0, 225, 135, 0.05)',
                  '0 0 25px rgba(0, 225, 135, 0.15)',
                  '0 0 15px rgba(0, 225, 135, 0.05)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
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
