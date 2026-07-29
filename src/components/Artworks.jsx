import { motion } from 'framer-motion'
import { useState } from 'react'
import { config } from '../config'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const Artworks = ({ darkMode, toggleTheme }) => {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow max-w-6xl mx-auto px-4 md:px-8 lg:px-12 pt-12 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500 inline-block mb-4">
            My Artworks
          </h1>
          <p className="theme-text-sub max-w-2xl mx-auto text-lg">
            A collection of my digital creations, exploring different styles, mediums, and concepts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
          {config.artworks.map((art, index) => (
            <ArtworkItem key={index} art={art} index={index} />
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

const ArtworkItem = ({ art, index }) => {
  const [isLandscape, setIsLandscape] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 border border-white/10 flex flex-col ${
        isLandscape ? 'md:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Image */}
      <div className="relative flex-grow overflow-hidden bg-white/5">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src={art.image}
          alt={art.title}
          onLoad={(e) => {
            if (e.target.naturalWidth > e.target.naturalHeight * 1.1) {
              setIsLandscape(true);
            }
          }}
          className={`w-full object-cover block ${isLandscape ? 'max-h-[500px]' : 'h-full max-h-[500px]'}`}
          loading="lazy"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end h-full">
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg leading-none">
              {art.title}
            </h3>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/80 text-white backdrop-blur-sm">
              {art.medium}
            </span>
          </div>
          
          <div className="flex justify-between items-end gap-4 mt-1">
            <p className="text-gray-200 text-sm line-clamp-2 drop-shadow-md flex-grow">
              {art.caption}
            </p>
            <div className="flex items-center text-gray-300 text-xs font-medium whitespace-nowrap shrink-0">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {art.date}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Artworks
