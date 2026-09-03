/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#FDFBF7',
          100: '#F7F0E6',
          200: '#EDE0D0',
          300: '#DFCEB9',
          400: '#C9B49C',
          500: '#AA937B',
          600: '#8B745D',
          700: '#6A5542',
          800: '#4B3A2C',
          900: '#2A1E15',
          950: '#140C07',
        },
        indigo: {
          earthy: '#1E293B',
          deep: '#0F172A',
          midnight: '#090D16',
        },
        category: {
          food: '#C25E3E',        // Terracotta
          fashion: '#881337',     // Maroon
          forts: '#854D0E',       // Warm bronze fort amber
          temples: '#D97706',     // Saffron amber
          monuments: '#B45309',   // Sandstone gold
          music: '#3730A3',       // Royal indigo
          dance: '#0D9488',       // Peacock teal
          crafts: '#CA8A04',      // Golden ochre
          culture: '#4338CA',     // Royal heritage
          festivals: '#E11D48',   // Celebration crimson
        },
        heritage: {
          ivory: '#FDFBF7',
          saffron: '#D97706',
          terracotta: '#C25E3E',
          maroon: '#881337',
          teal: '#0D9488',
          gold: '#CA8A04',
          stone: '#854D0E',
          navy: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'heritage-sm': '0 2px 8px -2px rgba(46, 36, 29, 0.08)',
        'heritage-md': '0 8px 24px -4px rgba(46, 36, 29, 0.12)',
        'heritage-lg': '0 16px 40px -8px rgba(46, 36, 29, 0.18)',
        'heritage-glow': '0 0 25px -5px rgba(217, 119, 6, 0.25)',
      },
      backgroundImage: {
        'sandstone-pattern': "radial-gradient(rgba(87, 83, 78, 0.08) 1px, transparent 1px)",
        'weave-pattern': "repeating-linear-gradient(45deg, rgba(136, 19, 55, 0.03) 0, rgba(136, 19, 55, 0.03) 1px, transparent 0, transparent 50%)",
        'parchment-vignette': "radial-gradient(circle at center, transparent 60%, rgba(46, 36, 29, 0.05) 100%)",
      },
      animation: {
        'cloud-float': 'cloudFloat 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        cloudFloat: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      }
    },
  },
  plugins: [],
}
