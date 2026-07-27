import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot, FaBrain,
  FaExternalLinkAlt, FaGithub, FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaChevronDown
} from 'react-icons/fa'
import { config } from '../config'

const ICON_MAP = { FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot, FaBrain }

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

  const featuredProject = config.projects.find((project) => project.status?.label)
  const otherProjects = config.projects.filter((project) => project !== featuredProject)

  const renderProjectCard = (project, index, featured = false) => {
    const Icon = ICON_MAP[project.icon]
    const hasImages = project.images && project.images.length > 0

    if (featured) {
      return (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-3xl border theme-border theme-border-hover theme-surface p-5 sm:p-6 shadow-md transition-all duration-300 group hover:-translate-y-1">

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left content area */}
              <div className="flex-1 min-w-0">
                {/* Title + Badge */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl theme-text">
                    {project.title}
                  </h3>
                  
                  {/* Live Pulsing Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-700 dark:text-fuchsia-300 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 dark:bg-fuchsia-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500 dark:bg-fuchsia-400" />
                    </span>
                    Currently Building
                  </span>
                </div>

                <p className="text-xs sm:text-sm theme-text-sub leading-relaxed max-w-3xl mb-4">
                  {project.description}
                </p>
              </div>

              {/* Right content area: Tech tags + Code Link */}
              <div className="flex flex-col md:items-end justify-between gap-4 shrink-0">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap md:flex-col md:items-end justify-start gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 text-xs font-mono font-semibold shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <a
                  href={project.githubUrl || 'https://github.com/p-art-dheev'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center md:justify-start gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 active:bg-slate-400 dark:active:bg-white/25 border border-fuchsia-500/30 hover:border-fuchsia-500 dark:hover:border-fuchsia-400 text-fuchsia-700 dark:text-fuchsia-300 hover:text-fuchsia-800 dark:hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer group/code mt-auto"
                >
                  <FaGithub className="text-sm group-hover/code:scale-110 transition-transform" />
                  <span className="group-hover/code:underline">Code</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.08 }}
        className="h-full"
      >
        <div
          className="flex flex-col md:flex-row md:max-h-[150px] h-full rounded-3xl overflow-hidden isolate transform-gpu transition-all duration-300 group hover:-translate-y-1.5 border theme-border theme-border-hover shadow-md theme-surface"
        >
          {/* Cover Image Header */}
          {hasImages ? (
            <div
              className="relative w-full h-28 sm:h-32 md:w-72 md:h-full overflow-hidden cursor-pointer group/image shrink-0"
              onClick={() => openGallery(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover/image:scale-105 active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30 opacity-60 dark:opacity-80 group-hover/image:opacity-40 dark:group-hover/image:opacity-60 transition-opacity" />

              {/* Status Pill */}
              {project.status?.label && (
                <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#077DE6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#077DE6]" />
                  </span>
                  {project.status.label}
                </div>
              )}

              {/* Gallery Pill */}
              <div className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-medium shadow-md group-hover/image:bg-black/95 transition-colors">
                <FaImages className="text-primary-400 text-[10px]" />
                <span>Gallery ({project.images.length})</span>
              </div>
            </div>
          ) : (
            <div className={`relative w-full h-28 sm:h-32 md:w-72 md:h-full flex items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden shrink-0`}>
              <div className="absolute inset-0 bg-black/20" />
              {Icon && <Icon className="text-4xl text-white opacity-90 z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />}

              {project.status?.label && (
                <div className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-wider shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary-500" />
                  </span>
                  {project.status.label}
                </div>
              )}
            </div>
          )}

          {/* Card Body */}
          <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-2.5 overflow-hidden">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                <h3 className="font-display font-extrabold leading-snug flex-1 min-w-[180px] text-base sm:text-lg theme-text">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-primary-500/15 hover:bg-primary-500/25 active:bg-primary-500/30 border border-primary-500/30 text-primary-400 hover:text-primary-300 text-[11px] font-mono font-semibold transition-all cursor-pointer group/live"
                    >
                      <FaExternalLinkAlt className="text-[10px] group-hover/live:scale-110 transition-transform" />
                      <span className="group-hover/live:underline">Demo</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl || 'https://github.com/p-art-dheev'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/15 active:bg-slate-400 dark:active:bg-white/20 border border-slate-300 dark:border-white/15 hover:border-primary-400/60 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-[11px] font-mono font-semibold transition-all cursor-pointer group/code"
                  >
                    <FaGithub className="text-xs group-hover/code:scale-110 transition-transform" />
                    <span className="group-hover/code:underline">Code</span>
                  </a>
                </div>
              </div>

              <p className="text-xs theme-text-sub leading-relaxed text-left line-clamp-1 sm:line-clamp-2 mb-2">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold border bg-primary-500/10 text-primary-400 border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
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

        <div className="flex flex-col gap-6">
          {featuredProject && renderProjectCard(featuredProject, 0, true)}

          <div className="grid grid-cols-1 gap-6">
            {otherProjects.map((project, index) => renderProjectCard(project, index))}
          </div>
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
              <div className="flex justify-between items-center bg-zinc-900/80 p-4 rounded-t-3xl backdrop-blur-md border border-white/10 border-b-0">
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
              <div className="relative bg-zinc-950 flex-1 flex items-center justify-center border border-white/10 rounded-b-3xl overflow-hidden min-h-[50vh] md:min-h-[70vh] p-2 md:p-4">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} image ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-3xl"
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
