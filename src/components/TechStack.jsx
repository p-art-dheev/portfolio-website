import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPython, FaGitAlt, FaGithub,
} from 'react-icons/fa'
import { SiCplusplus, SiTailwindcss } from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { config } from '../config'

const ICON_MAP = {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaPython, FaGitAlt, FaGithub,
  SiCplusplus, SiTailwindcss, VscVscode,
}

const TechItem = ({ tech }) => {
  const Icon = ICON_MAP[tech.icon]
  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl border theme-border theme-surface hover:border-primary-500/50 transition-colors">
      {Icon && <Icon className={`text-base md:text-lg ${tech.color}`} />}
      <span className="text-xs font-semibold whitespace-nowrap">{tech.name}</span>
    </div>
  )
}

const TechStack = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const half = Math.ceil(config.techStack.length / 2)
  const row1 = config.techStack.slice(0, half)
  const row2 = config.techStack.slice(half)

  const row1Items = [...row1, ...row1, ...row1, ...row1]
  const row2Items = [...row2, ...row2, ...row2, ...row2]

  return (
    <section>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-xl md:text-2xl font-display font-extrabold mb-6 text-center" style={{ letterSpacing: '-0.02em' }}>Tech Stack & Tools</h2>

        <div className="flex flex-col gap-3">
          {/* Row 1 — scroll left */}
          <div className="relative overflow-hidden mask-gradient group">
            <div className="flex gap-3 animate-scroll group-hover:[animation-play-state:paused] py-0.5" style={{ width: 'fit-content' }}>
              {row1Items.map((tech, i) => (
                <TechItem tech={tech} key={`r1-${i}`} />
              ))}
            </div>
          </div>

          {/* Row 2 — scroll right */}
          <div className="relative overflow-hidden mask-gradient group">
            <div className="flex gap-3 animate-scroll-reverse group-hover:[animation-play-state:paused] py-0.5" style={{ width: 'fit-content' }}>
              {row2Items.map((tech, i) => (
                <TechItem tech={tech} key={`r2-${i}`} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
      `}</style>
    </section>
  )
}

export default TechStack
