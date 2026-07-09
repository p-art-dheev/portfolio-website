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
        className={`group relative rounded-3xl overflow-hidden isolate transform-gpu transition-all duration-300 flex flex-col h-full ${
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
            className={`relative w-full overflow-hidden cursor-pointer group/image isolate z-0 transform-gpu ${featured ? 'h-24 md:h-auto md:w-[28%] md:order-2 rounded-t-[calc(1.5rem-2px)] md:rounded-none md:rounded-r-[calc(1.5rem-2px)]' : 'h-36 md:h-40 rounded-t-[calc(1.5rem-2px)]'}`}
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

          <p className={`theme-text-sub mb-2 leading-relaxed flex-1 ${featured ? 'text-sm md:text-base md:max-w-xl' : 'text-sm'}`}>
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
