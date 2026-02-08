import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FaPlay, FaPause, FaStepBackward, FaStepForward,
  FaVolumeUp, FaVolumeMute, FaMusic,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { config } from '../../config'

/** Number of equalizer bars */
const BAR_COUNT = 12
const bars = Array.from({ length: BAR_COUNT }, (_, i) => i)

const MusicWidget = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  const audioRef = useRef(null)
  const progressBarRef = useRef(null)

  // Handle single object vs array for backward compatibility
  const playlist = Array.isArray(config.music) ? config.music : [config.music]
  const currentSong = playlist[currentSongIndex]

  const handleNext = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length)
  }, [playlist.length])

  const handlePrev = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
  }, [playlist.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => handleNext()

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex, handleNext])

  // Auto-play when song changes (only if already playing)
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentSongIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    const newTime = pct * duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="glass-card p-4 h-full flex flex-col gap-4 relative overflow-hidden group">
      {currentSong?.audioFile && (
        <audio ref={audioRef} src={currentSong.audioFile} />
      )}

      {/* Album Art & Equalizer */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0">
          {currentSong?.coverArt ? (
            <img
              src={currentSong.coverArt}
              alt={currentSong.album || 'Album Cover'}
              className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'rotate-[360deg]' : ''}`}
            />
          ) : (
            <div className="w-full h-full bg-surface-800 flex items-center justify-center">
              <FaMusic className="text-xl text-white/30" />
            </div>
          )}

          {/* Circular progress overlay (optional, subtle) */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center h-full">
          <div className="flex justify-between items-start mb-1">
            <div className="min-w-0">
              <p className="font-display font-bold text-sm truncate theme-text leading-tight group-hover:text-primary-500 transition-colors">
                {currentSong?.title || 'Track Title'}
              </p>
              <p className="text-xs theme-text-sub font-medium truncate opacity-70">
                {currentSong?.artist || 'Artist Name'}
              </p>
            </div>

            {/* Mini Equalizer */}
            <div className="flex items-end gap-[2px] h-4 mb-1">
              {bars.map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] bg-primary-500 rounded-t-sm"
                  animate={{
                    height: isPlaying ? [4, Math.random() * 12 + 4, 4] : 3,
                    opacity: isPlaying ? 1 : 0.3,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.05, // Stagger effect
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors theme-text-muted hover:text-primary-500"
        >
          {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors theme-text-muted hover:text-primary-500"
          >
            <FaStepBackward size={14} />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-400 flex items-center justify-center transition-all shadow-lg shadow-primary-500/20 active:scale-95"
          >
            {isPlaying ?
              <FaPause className="text-white ml-[1px]" size={14} /> :
              <FaPlay className="text-white ml-[3px]" size={14} />
            }
          </button>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors theme-text-muted hover:text-primary-500"
          >
            <FaStepForward size={14} />
          </button>
        </div>

        {/* Placeholder for layout balance */}
        <div className="w-8" />
      </div>

      {/* Wavy Progress Bar */}
      <div
        ref={progressBarRef}
        onClick={handleProgressClick}
        className="absolute bottom-0 left-0 w-full h-1.5 cursor-pointer group/progress"
      >
        {/* Track */}
        <div className="absolute inset-0 bg-white/5 group-hover/progress:bg-white/10 transition-colors" />

        {/* Fill */}
        <div
          className="absolute top-0 left-0 h-full bg-primary-500 transition-all duration-100 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Animated Wave Pattern Overlay */}
          <div
            className="absolute inset-0 w-full h-full opacity-50"
            style={{
              backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)`,
              backgroundSize: '10px 10px',
              animation: isPlaying ? 'moveStripes 1s linear infinite' : 'none'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes moveStripes {
          0% { background-position: 0 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>
    </div>
  )
}

export default MusicWidget
