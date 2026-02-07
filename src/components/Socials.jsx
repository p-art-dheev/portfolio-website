import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { config } from '../config'

/** Map icon string names from config → actual components */
const ICON_MAP = { FaGithub, FaLinkedin, FaTwitter, FaEnvelope }

const Socials = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="socials" className="py-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {config.socials.map((social, index) => {
            const Icon = ICON_MAP[social.icon]
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`glass-card p-8 flex flex-col items-center gap-4 group transition-all ${social.hoverColor}`}
              >
                {Icon && <Icon className="text-6xl group-hover:text-primary-500 group-hover:scale-110 transition-all" />}
                <span className="font-semibold text-lg">{social.name}</span>
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Socials
