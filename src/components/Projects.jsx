import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import {
  FaLaptopCode, FaMobileAlt, FaChartLine, FaRobot, FaBrain,
  FaExternalLinkAlt, FaGithub, FaTimes, FaChevronLeft, FaChevronRight, FaImages
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

    return (
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: featured ? 0 : index * 0.1 }}
        className="h-full"
      >
        {/* ================= MOBILE CARD UI (Redesigned for touch & mobile UX) ================= */}
        <div
          className={`md:hidden flex flex-col h-full rounded-3xl overflow-hidden isolate transition-all duration-300 ${
            featured
              ? 'border-2 border-[#077DE6]/60 shadow-[0_0_24px_rgba(7,125,230,0.25)]'
              : 'border border-[#10B981]/50 shadow-md'
          }`}
          style={{
            background: featured
              ? 'linear-gradient(180deg, rgba(7,125,230,0.12) 0%, rgba(19,19,26,0.95) 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(19,19,26,0.95) 100%)',
          }}
        >
          {/* Mobile Cover Image Area */}
          {hasImages ? (
            <div
              className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer group/image"
              onClick={() => openGallery(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-black/30" />

              {/* Status Badge Top-Left on Cover */}
              {project.status?.label && (
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#077DE6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#077DE6]" />
                  </span>
                  {project.status.label}
                </div>
              )}

              {/* Gallery Trigger Top-Right */}
              <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium shadow-md">
                <FaImages className="text-primary-400" />
                <span>Gallery ({project.images.length})</span>
              </div>
            </div>
          ) : (
            <div className={`relative w-full h-36 flex items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              {Icon && <Icon className="text-5xl text-white opacity-90 z-10 drop-shadow-md" />}

              {project.status?.label && (
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                  </span>
                  {project.status.label}
                </div>
              )}
            </div>
          )}

          {/* Mobile Card Content */}
          <div className="p-4 flex-1 flex flex-col justify-between gap-3">
            <div>
              <h3 className={`font-display font-bold mb-1.5 leading-snug ${
                featured ? 'text-xl text-[#077DE6]' : 'text-lg theme-text'
              }`}>
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm theme-text-sub leading-relaxed text-left mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
                      featured
                        ? 'bg-[#077DE6]/15 text-[#077DE6] border-[#077DE6]/30'
                        : 'bg-primary-500/10 text-primary-400 border-primary-500/20'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Touch-Friendly Action Bar */}
            <div className="pt-3 border-t theme-border flex flex-wrap items-center gap-2 mt-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-primary-500/20 active:bg-primary-500/30 border border-primary-500/40 text-primary-400 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] py-2 px-3 rounded-xl theme-surface border theme-border active:bg-white/10 text-xs font-display font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <FaGithub className="text-sm" />
                  <span>Code</span>
                </a>
              )}
              {hasImages && !project.liveUrl && !project.githubUrl && (
                <button
                  onClick={() => openGallery(project)}
                  className="w-full py-2 px-3 rounded-xl bg-primary-500/20 active:bg-primary-500/30 border border-primary-500/40 text-primary-400 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <FaImages className="text-xs" />
                  <span>View Gallery ({project.images.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= DESKTOP CARD UI ================= */}
        <div
          className={`hidden md:flex group relative rounded-3xl overflow-hidden isolate transform-gpu transition-all duration-300 flex-col h-full ${
            featured 
              ? 'w-full md:flex-row border-2 border-[#077DE6]/60 shadow-[0_0_28px_rgba(7,125,230,0.25),0_0_60px_rgba(7,125,230,0.10)] hover:border-[#077DE6] hover:shadow-[0_0_40px_rgba(7,125,230,0.45),0_0_80px_rgba(7,125,230,0.18)]' 
              : 'border border-[#10B981] hover:border-[#10B981]/80 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
          }`}
          style={{
            background: featured 
              ? 'linear-gradient(135deg, rgba(7,125,230,0.08) 0%, rgba(7,125,230,0.02) 100%)' 
              : 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
          }}
        >
          {/* Image Cover Section */}
          {hasImages ? (
            <div
              className={`relative w-full overflow-hidden cursor-pointer group/image isolate z-0 transform-gpu ${featured ? 'h-44 sm:h-56 md:h-auto md:w-[28%] md:order-2 rounded-t-[calc(1.5rem-2px)] md:rounded-none md:rounded-r-[calc(1.5rem-2px)]' : 'h-36 md:h-40 rounded-t-[calc(1.5rem-2px)]'}`}
              style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
              onClick={() => openGallery(project)}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover rounded-[inherit] transition-transform duration-700 group-hover/image:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md font-medium text-[10px] transition-colors flex items-center gap-1 border border-white/30 shadow-xl">
                  <FaImages /> View Gallery ({project.images.length})
                </span>
              </div>
            </div>
          ) : (
            <div className={`relative w-full flex items-center justify-center bg-gradient-to-br ${project.gradient} opacity-80 overflow-hidden ${featured ? 'h-24 md:h-auto md:w-[28%] md:order-2 rounded-t-[calc(1.5rem-2px)] md:rounded-none md:rounded-r-[calc(1.5rem-2px)]' : 'h-36 md:h-40 rounded-t-[calc(1.5rem-2px)]'}`}>
              <div className="absolute inset-0 bg-black/20" />
              {Icon && <Icon className={`${featured ? 'text-5xl md:text-6xl' : 'text-5xl'} text-white opacity-80 z-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-500`} />}
            </div>
          )}

          {/* Content Section */}
          <div className={`p-3 md:p-4 flex-1 flex flex-col justify-center relative z-10 theme-surface bg-opacity-50 ${featured ? 'md:p-6 md:w-[72%] md:order-1' : ''}`}>
            {/* Icon (only if no images) */}
            {!hasImages && !featured && (
              <div className="mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 -mt-9 border-[3px] border-[#13131a] relative z-20`}>
                  {Icon && <Icon className="text-lg text-white" />}
                </div>
              </div>
            )}

            {/* Title & Status Badge inline */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className={`font-display transition-colors ${hasImages && !featured ? 'mt-1' : ''} ${featured ? 'text-2xl md:text-3xl text-[#077DE6] font-black tracking-tight group-hover:text-[#3ba2ff]' : 'text-lg font-bold group-hover:text-primary-500'}`}>
                {project.title}
              </h3>

              {featured && project.status?.label && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#077DE6]/50 bg-[#077DE6]/15 text-[#077DE6] text-[11px] font-bold uppercase tracking-[0.18em] w-fit shadow-[0_0_16px_rgba(7,125,230,0.35)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#077DE6] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#077DE6]" />
                  </span>
                  <span>{project.status.label}</span>
                </div>
              )}

              {!featured && project.status?.label && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-500 text-[10px] font-semibold uppercase tracking-[0.15em] w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                  </span>
                  {project.status.label}
                </div>
              )}
            </div>

            <p className={`theme-text-sub mb-2 leading-relaxed flex-1 text-justify ${featured ? 'text-sm md:text-base md:max-w-xl' : 'text-sm'}`}>
              {project.description}
            </p>

            {/* Tags */}
            <div className={`flex flex-wrap gap-1.5 mb-2 ${featured ? 'gap-2 mb-3' : ''}`}>
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 theme-surface rounded-md text-[10px] font-mono font-bold border transition-colors ${
                    featured 
                      ? 'px-2.5 py-1 text-sm md:text-[0.95rem] text-[#077DE6] border-[#077DE6]/20 group-hover:border-[#077DE6]/40' 
                      : 'text-primary-500 border-primary-500/20 group-hover:border-primary-500/40'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-2 border-t theme-border mt-auto">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs theme-text-sub hover:text-primary-500 transition-colors group/link font-medium"
                >
                  <FaExternalLinkAlt className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform text-[10px]" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs theme-text-sub hover:text-primary-500 transition-colors group/link font-medium"
                >
                  <FaGithub className="group-hover/link:-translate-y-0.5 transition-transform text-xs" />
                  Source Code
                </a>
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
