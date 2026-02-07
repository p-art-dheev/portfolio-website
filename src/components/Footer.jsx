import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="mt-6 px-4 md:px-8 pb-6">
      <div className="glass-card p-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="theme-text-sub text-center md:text-left">
            © {new Date().getFullYear()} Portfolio.Centric. Crafted with{' '}
            <FaHeart className="inline text-red-500 animate-pulse" /> and code.
          </p>

          <div className="flex gap-8">
            <a href="#privacy" className="theme-text-sub hover:text-primary-500 transition-colors">
              Privacy
            </a>
            <a href="#terms" className="theme-text-sub hover:text-primary-500 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
