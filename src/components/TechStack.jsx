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
    <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl border theme-border min-w-[100px]">
      {Icon && <Icon className={`text-2xl ${tech.color}`} />}
      <span className="text-xs font-medium">{tech.name}</span>
    </div>
  )
}

const TechStack = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const items = [...config.techStack, ...config.techStack]

  return (
    <section>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>Technologies Experienced With</h2>

        <div className="flex flex-col gap-4">
          {/* Single scrolling row */}
          <div className="relative overflow-hidden mask-gradient group">
            <div className="flex gap-4 animate-scroll group-hover:[animation-play-state:paused] py-1" style={{ width: 'fit-content' }}>
              {items.map((tech, i) => (
                <TechItem tech={tech} key={`r1-${i}`} />
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
