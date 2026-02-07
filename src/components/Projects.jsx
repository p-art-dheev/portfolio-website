import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot,
  FaExternalLinkAlt, FaGithub,
} from 'react-icons/fa'
import { config } from '../config'

const ICON_MAP = { FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot }

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.projects.map((project, index) => {
            const Icon = ICON_MAP[project.icon]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border theme-border p-5 group hover:border-primary-500/40 transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center flex-shrink-0`}>
                    {Icon && <Icon className="text-lg text-white" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="theme-text-sub text-sm mb-3 leading-relaxed">{project.description}</p>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 theme-surface rounded-md text-xs text-primary-500 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href="#" className="text-sm theme-text-muted hover:text-primary-500 transition-colors">
                          <FaExternalLinkAlt />
                        </a>
                        <a href="#" className="text-sm theme-text-muted hover:text-primary-500 transition-colors">
                          <FaGithub />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

export default Projects
