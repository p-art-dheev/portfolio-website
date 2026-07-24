import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 md:p-12 text-center max-w-lg w-full flex flex-col items-center"
      >
        <h1 className="text-6xl md:text-8xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#059669] to-[#0d9488] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-display font-bold theme-text mb-4">
          Page Not Found
        </h2>
        <p className="text-sm md:text-base theme-text-sub mb-8">
          Oops! It looks like you're lost in space. The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#059669]/20 border border-[#059669]/30 rounded-xl theme-text font-display font-bold text-sm transition-all hover:bg-[#059669]/30 active:scale-95 flex items-center gap-2"
        >
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
