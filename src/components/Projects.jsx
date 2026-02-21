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
        <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-2 text-center" style={{ letterSpacing: '-0.02em' }}>Projects</h2>
        <p className="text-center theme-text-sub text-sm md:text-base mb-8 max-w-2xl mx-auto">Showcasing some of my recent work and open source contributions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {config.projects.map((project, index) => {
            const Icon = ICON_MAP[project.icon]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border theme-border p-6 hover:border-primary-500/50 transition-all duration-300 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
                }}
              >
                {/* Removed green gradient overlay for cleaner hover effect */}

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with gradient background */}
                  <div className="mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {Icon && <Icon className="text-2xl text-white" />}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="theme-text-sub text-sm mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 theme-surface rounded-lg text-xs text-primary-500 font-mono border border-primary-500/20 group-hover:border-primary-500/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-3 border-t border-white/5">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm theme-text-sub hover:text-primary-500 transition-colors group/link"
                    >
                      <FaExternalLinkAlt className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm theme-text-sub hover:text-primary-500 transition-colors group/link"
                    >
                      <FaGithub className="group-hover/link:rotate-12 transition-transform" />
                      <span className="font-medium">Source</span>
                    </a>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl`} />
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
