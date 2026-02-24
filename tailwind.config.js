/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0d1f3c',
          50:  '#e8edf5',
          100: '#c5d0e8',
          200: '#9fb0d7',
          300: '#7990c6',
          400: '#5a78b9',
          500: '#3a60ac',
          600: '#2e54a0',
          700: '#1f4490',
          800: '#0f357f',
          900: '#0d1f3c',
        },
        brand: {
          blue:       '#2563eb',
          lightBlue:  '#3b82f6',
          sky:        '#60a5fa',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0d1f3c 0%, #0a2960 60%, #0f3080 100%)',
        'brand-gradient':'linear-gradient(135deg, #2563eb, #3b82f6)',
        'card-gradient': 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
      },
    },
  },
  plugins: [],
}
