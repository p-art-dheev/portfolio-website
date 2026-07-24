import { config } from '../config'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 mt-12 border-t theme-border relative z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm theme-text-sub font-medium text-center md:text-left">
          © {currentYear} {config.personal.name}. All rights reserved.
        </p>
        <div className="text-sm theme-text-sub font-medium flex items-center gap-1">
          Built with <span className="text-red-500">❤️</span> using React & Tailwind
        </div>
      </div>
    </footer>
  )
}

export default Footer
