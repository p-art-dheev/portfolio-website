/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#effef7',
          100: '#dafeea',
          200: '#b8fadd',
          300: '#81f4c3',
          400: '#43e5a0',
          500: '#00e187',
          600: '#00b26a',
          700: '#008c52',
          800: '#00693d',
          900: '#00492a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        dark: {
          50: '#e8e8f0',
          100: '#a8a8b8',
          200: '#6e6e7e',
          300: '#4a4a5a',
          400: '#1a1a24',
          500: '#13131a',
          600: '#0a0a0f',
          700: '#050508',
          800: '#020203',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 25s linear infinite',
        'scroll-reverse': 'scroll-reverse 25s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { filter: 'hue-rotate(0deg)' },
          '50%': { filter: 'hue-rotate(20deg)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
