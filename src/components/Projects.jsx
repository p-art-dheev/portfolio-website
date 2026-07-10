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
          <div className="relative overflow-hidden rounded-3xl border-2 border-fuchsia-500/60 hover:border-fuchsia-400 bg-gradient-to-r from-[#171124] via-[#1f1633] to-[#141021] p-5 sm:p-6 shadow-[0_0_35px_rgba(217,70,239,0.18)] hover:shadow-[0_0_45px_rgba(217,70,239,0.3)] transition-all duration-300 group hover:-translate-y-1">
            {/* Decorative ambient glow */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 -bottom-10 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left content area */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  {/* Live Pulsing Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/40 text-fuchsia-300 text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-400" />
                    </span>
                    Currently Building
                  </span>

                  {/* Icon tag */}
                  {Icon && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-fuchsia-300 text-[11px] font-mono">
                      <Icon className="text-xs text-fuchsia-400" />
                      <span>AI Research</span>
                    </span>
                  )}
                </div>

                {/* Title + Code link */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-fuchsia-300 transition-colors">
                    {project.title}
                  </h3>
                  <a
                    href={project.githubUrl || 'https://github.com/p-art-dheev'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/25 border border-fuchsia-500/30 hover:border-fuchsia-400 text-fuchsia-300 hover:text-white text-xs font-mono font-semibold transition-all cursor-pointer group/code"
                  >
                    <FaGithub className="text-sm group-hover/code:scale-110 transition-transform" />
                    <span className="group-hover/code:underline">Code</span>
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>

              {/* Right content area: Tech tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap md:flex-col md:items-end justify-start gap-1.5 shrink-0">
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
        transition={{ delay: featured ? 0 : index * 0.08 }}
        className="h-full"
      >
        <div
          className={`flex flex-col h-full rounded-3xl overflow-hidden isolate transform-gpu transition-all duration-300 group hover:-translate-y-1.5 ${
            featured
              ? 'border-2 border-[#077DE6]/70 hover:border-[#077DE6] shadow-[0_0_28px_rgba(7,125,230,0.22)] hover:shadow-[0_0_40px_rgba(7,125,230,0.35)] md:flex-row md:max-h-[150px]'
              : 'border border-[#10B981]/50 hover:border-[#10B981] shadow-md hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]'
          }`}
          style={{
            background: featured
              ? 'linear-gradient(180deg, rgba(7,125,230,0.15) 0%, rgba(19,19,26,0.95) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(19,19,26,0.95) 100%)',
          }}
        >
          {/* Cover Image Header */}
          {hasImages ? (
            <div
              className={`relative w-full h-28 sm:h-32 overflow-hidden cursor-pointer group/image shrink-0 ${
                featured ? 'md:w-72 md:h-full' : ''
              }`}
              onClick={() => openGallery(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover/image:scale-105 active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-black/30 opacity-80 group-hover/image:opacity-60 transition-opacity" />

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
            <div className={`relative w-full h-28 sm:h-32 flex items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden shrink-0 ${
              featured ? 'md:w-72 md:h-full' : ''
            }`}>
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
                <h3 className={`font-display font-extrabold leading-snug transition-colors flex-1 min-w-[180px] ${
                  featured ? 'text-lg sm:text-xl text-[#077DE6] group-hover:text-[#3ba2ff]' : 'text-base sm:text-lg theme-text group-hover:text-primary-400'
                }`}>
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
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/15 active:bg-white/20 border border-white/15 hover:border-primary-400/60 text-primary-400 hover:text-primary-300 text-[11px] font-mono font-semibold transition-all cursor-pointer group/code"
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
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                        featured
                          ? 'bg-[#077DE6]/15 text-[#077DE6] border-[#077DE6]/30'
                          : 'bg-primary-500/10 text-primary-400 border-primary-500/20'
                      }`}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
