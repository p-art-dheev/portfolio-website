import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot,
  FaExternalLinkAlt, FaGithub, FaTimes, FaChevronLeft, FaChevronRight, FaImages
} from 'react-icons/fa'
import { config } from '../config'

const ICON_MAP = { FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot }

const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  // Gallery Modal State
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openGallery = (project, index = 0) => {
    if (!project.images || project.images.length === 0) return;
    setSelectedProject(project)
    setCurrentImageIndex(index)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const closeGallery = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = (e) => {
    e.stopPropagation()
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    if (!selectedProject) return
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length)
  }

  return (
    <section id="projects">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 md:p-8"
      >
        <h2 className="text-xl md:text-2xl font-display font-extrabold mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.projects.map((project, index) => {
            const Icon = ICON_MAP[project.icon]
            const hasImages = project.images && project.images.length > 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl border theme-border overflow-hidden hover:border-primary-500/50 transition-all duration-300 flex flex-col h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
                }}
              >
                {/* Image Cover Section */}
                {hasImages ? (
                  <div
                    className="relative w-full h-48 md:h-56 overflow-hidden cursor-pointer group/image"
                    onClick={() => openGallery(project)}
                  >
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md font-medium text-sm transition-colors flex items-center gap-2 border border-white/30 shadow-xl">
                        <FaImages /> View Gallery ({project.images.length})
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`relative w-full h-48 md:h-56 flex items-center justify-center bg-gradient-to-br ${project.gradient} opacity-80 overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    {Icon && <Icon className="text-6xl text-white opacity-80 z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />}
                  </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col relative z-10 theme-surface bg-opacity-50">
                  {/* Icon (only if no images) */}
                  {!hasImages && (
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 -mt-12 border-[3px] border-[#13131a] relative z-20`}>
                        {Icon && <Icon className="text-xl text-white" />}
                      </div>
                    </div>
                  )}

                  {/* Title & Description */}
                  <h3 className={`text-xl font-display font-bold mb-2 group-hover:text-primary-500 transition-colors ${hasImages ? 'mt-2' : ''}`}>
                    {project.title}
                  </h3>

                  <p className="theme-text-sub text-sm mb-5 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 theme-surface rounded-md text-[11px] text-primary-500 font-mono border border-primary-500/20 group-hover:border-primary-500/40 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4 pt-4 border-t theme-border mt-auto">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm theme-text-sub hover:text-primary-500 transition-colors group/link font-medium"
                    >
                      <FaExternalLinkAlt className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform text-xs" />
                      Live Demo
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm theme-text-sub hover:text-primary-500 transition-colors group/link font-medium"
                    >
                      <FaGithub className="group-hover/link:-translate-y-0.5 transition-transform text-xs" />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Fullscreen Image Gallery Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <div
              className="relative w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center bg-zinc-900/80 p-4 rounded-t-xl backdrop-blur-md border border-white/10 border-b-0">
                <h3 className="text-white font-display font-bold text-lg md:text-xl px-2 truncate">
                  {selectedProject.title} <span className="text-zinc-400 font-normal text-sm ml-2">{currentImageIndex + 1} / {selectedProject.images.length}</span>
                </h3>
                <button
                  onClick={closeGallery}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Main Image Area */}
              <div className="relative bg-zinc-950 flex-1 flex items-center justify-center border border-white/10 rounded-b-xl overflow-hidden min-h-[50vh] md:min-h-[70vh]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary-500 text-white backdrop-blur-md transition-all border border-white/20 hover:border-transparent hover:scale-105"
                    >
                      <FaChevronLeft className="text-xl pr-1" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/50 hover:bg-primary-500 text-white backdrop-blur-md transition-all border border-white/20 hover:border-transparent hover:scale-105"
                    >
                      <FaChevronRight className="text-xl pl-1" />
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
