import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showNotification, setShowNotification] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setShowNotification(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-xl glass-card border theme-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/40 focus:outline-none transition-all bg-transparent'

  return (
    <section className="py-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Get In Touch</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium theme-text-sub mb-2">
              Name
            </label>
            <input
              type="text" id="name" name="name"
              value={formData.name} onChange={handleChange} required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium theme-text-sub mb-2">
              Email
            </label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange} required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium theme-text-sub mb-2">
              Message
            </label>
            <textarea
              id="message" name="message"
              value={formData.message} onChange={handleChange} required rows="5"
              className={`${inputClasses} resize-y`}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <FaPaperPlane />
            <span>Send Message</span>
          </motion.button>
        </form>
      </motion.div>

      {/* Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-8 right-8 glass-card p-4 z-50 shadow-2xl"
        >
          <p className="text-primary-500 font-semibold">Message sent successfully!</p>
        </motion.div>
      )}
    </section>
  )
}

export default Contact
