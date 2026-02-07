import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPaperPlane, FaArrowRight } from 'react-icons/fa'
import { config } from '../config'

const ICON_MAP = { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope }

const ConnectSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      },
      config.emailjs.publicKey
    )
      .then(() => {
        setLoading(false)
        setStatus({ type: 'success', message: 'Message sent successfully!' })
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus({ type: '', message: '' }), 5000)
      })
      .catch((error) => {
        console.error('EmailJS Error:', error)
        setLoading(false)
        setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
        setTimeout(() => setStatus({ type: '', message: '' }), 5000)
      })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="socials">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>Let's Connect</h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact form — LHS */}
          <div className="w-full md:w-2/3 mx-auto md:mx-0">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text" name="name" placeholder="Name"
                value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-xl border theme-border bg-transparent theme-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none transition-all text-sm font-medium placeholder:font-medium placeholder:opacity-50"
              />
              <input
                type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange} required
                className="w-full px-4 py-2.5 rounded-xl border theme-border bg-transparent theme-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none transition-all text-sm font-medium placeholder:font-medium placeholder:opacity-50"
              />
              <textarea
                name="message" placeholder="Your message..."
                value={formData.message} onChange={handleChange} required rows="3"
                className="w-full px-4 py-2.5 rounded-xl border theme-border bg-transparent theme-text focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none transition-all text-sm font-medium resize-none placeholder:font-medium placeholder:opacity-50"
              />
              <AnimatePresence mode="wait">
                {status.message ? (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-display font-bold text-sm text-center ${status.type === 'error'
                        ? 'bg-red-500/10 border-red-500/30 text-red-500'
                        : 'bg-primary-500/10 border-primary-500/30 text-primary-500'
                      }`}
                  >
                    {status.message}
                  </motion.div>
                ) : (
                  <motion.button
                    key="button"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-500/20 border border-primary-500/30 rounded-xl text-primary-500 font-display font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed" style={{ letterSpacing: '0.03em' }}
                  >
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    {!loading && <FaArrowRight className="text-xs" />}
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Socials — RHS */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-lg font-display font-bold theme-text">Socials</h3>
              <p className="text-sm theme-text-sub mt-1">Connect with me across the digital universe.</p>
            </div>
            <div className="flex flex-row flex-wrap gap-3 justify-center md:justify-start items-center">
              {config.socials.map((social, index) => {
                const Icon = ICON_MAP[social.icon]
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 15 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border theme-border theme-surface-hover transition-all group min-w-[110px]"
                  >
                    {Icon && <Icon className={`text-lg ${social.hoverColor} transition-colors`} />}
                    <span className={`text-sm font-display font-semibold theme-text-sub ${social.hoverColor} transition-colors whitespace-nowrap`} style={{ letterSpacing: '0.02em' }}>{social.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>
      </motion.div>


    </section>
  )
}

export default ConnectSection
