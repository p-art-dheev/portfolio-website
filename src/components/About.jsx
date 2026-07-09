import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import GitHubContributions from './GitHubContributions'
import { config } from '../config'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const { username, startYear = 2020 } = config.github

  return (
    <section id="about">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-6"
      >
        {/* About Card */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-display font-extrabold mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>About Me</h2>
          <div className="space-y-4 text-sm md:text-base theme-text-sub leading-relaxed font-sans text-justify">
            {config.personal.bio.map((paragraph, i) => (
              <p key={i} className="text-justify">{paragraph}</p>
            ))}
          </div>
        </div>

        <GitHubContributions username={username} startYear={startYear} />
      </motion.div>
    </section>
  )
}

export default About
