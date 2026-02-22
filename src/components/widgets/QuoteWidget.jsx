import { useState, useEffect } from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { config } from '../../config'

const ROTATE_INTERVAL = 8000

const QuoteWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const quotes = config.quotes

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length)
    }, ROTATE_INTERVAL)
    return () => clearInterval(interval)
  }, [quotes.length])

  const { text, author } = quotes[currentIndex]

  return (
    <div className="glass-card p-3 h-full flex items-center">
      <div className="relative w-full">
        <FaQuoteLeft className="absolute -top-1 -left-1 text-xl md:text-2xl text-primary-500 opacity-30" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pl-5 md:pl-6"
          >
            <p className="text-xs md:text-sm italic mb-1 opacity-80 leading-relaxed font-sans">{text}</p>
            <p className="text-right theme-text-sub text-[10px] md:text-xs font-display opacity-60">— {author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default QuoteWidget
