import { motion, AnimatePresence } from 'framer-motion'
import { FaFileAlt, FaEnvelope, FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import StatusWidget from './widgets/StatusWidget'
// import MusicWidget from './widgets/MusicWidget'
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
        className="w-full grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-3 auto-rows-[minmax(60px,auto)]"
      >
        {/* Main Hero Card */}
        <motion.div
          variants={item}
          className="glass-card col-span-1 md:col-span-8 lg:col-span-7 row-span-3 p-5 md:p-6 flex items-center gap-5"
        >
          <div className="flex-1">
            {/* Greeting */}
            <div className="h-6 md:h-7 mb-2 flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={greetIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-base md:text-lg lg:text-xl font-semibold opacity-60 theme-greeting"
                  style={{ fontFamily: "'Noto Sans', 'Noto Sans Devanagari', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans Tamil', 'Noto Sans Arabic', 'Space Grotesk', sans-serif" }}
                >
                  {GREETINGS[greetIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* I'm + Name */}
            <h1 className="flex items-baseline leading-tight mb-3 whitespace-nowrap font-display" style={{ letterSpacing: '-0.02em' }}>
              <span className="text-lg md:text-xl lg:text-2xl font-bold theme-greeting mr-2 opacity-80">I'm</span>
              <span className="text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-extrabold theme-name">{config.personal.name}</span>
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
            <div className="flex gap-3 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('/assets/resume/Pardheev_s_Resume.pdf', '_blank')}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary-500/20 border border-primary-500/30 rounded-xl theme-text font-display font-semibold text-sm transition-all min-w-[120px] justify-center"
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
                className="flex items-center gap-2 px-4 py-2.5 btn-secondary text-sm font-display font-semibold min-w-[120px] justify-center"
              >
                <FaEnvelope />
                <span>Contact</span>
              </motion.button>
            </div>
          </div>

          {/* Profile Picture */}
          <motion.div
            className="hidden md:flex w-32 h-32 lg:w-48 lg:h-48 relative flex-shrink-0 group cursor-pointer"
          >
            {/* Outer Pulsing Glow */}
            <div className="absolute -inset-4 rounded-full bg-primary-500/10 blur-xl animate-pulse transition-all duration-500" />

            {/* Pulsating Inner Ring */}
            <div className="absolute -inset-1 rounded-full border-[3px] border-primary-500/40 animate-pulse transition-all duration-300" />

            {/* Soft Glow effect behind image */}
            <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-md transition-all duration-500" />

            {/* Main Image Container */}
            <div className="absolute inset-0 rounded-full border-[3px] border-primary-500/30 overflow-hidden shadow-[0_0_20px_rgba(var(--color-primary-500),0.3)] bg-[#13131a] z-10 transition-all duration-500">
              {config.personal.profileImage ? (
                <img
                  src={config.personal.profileImage}
                  alt={config.personal.name}
                  className="block w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <FaUser className="text-5xl lg:text-6xl text-white/90 absolute inset-0 m-auto flex items-center justify-center z-10" />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Sidebar widgets */}
        <motion.div
          variants={item}
          className="col-span-1 md:col-span-4 lg:col-span-3 row-span-3 flex flex-col gap-3 h-full"
        >
          <div className="flex-[0.7] min-h-0">
            <StatusWidget />
          </div>

          <div className="flex-[1.3] min-h-0">
            <EducationWidget />
          </div>
        </motion.div>

        {/* <motion.div variants={item} className="col-span-1 md:col-span-4 lg:col-span-3 row-span-1">
          <MusicWidget />
        </motion.div> */}

        
      </motion.div>
    </section>
  )
}

export default Hero
