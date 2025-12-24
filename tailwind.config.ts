import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Levels-style warm minimal palette
        cream: '#FAF9F7',
        'warm-white': '#FEFDFB',
        charcoal: '#1A1A1A',
        'dark-bg': '#0A0A0A',
        lime: '#C8FF00',
        'warm-gray': {
          50: '#F9F8F6',
          100: '#F5F3EF',
          200: '#E8E6E1',
          300: '#D4D1C9',
          400: '#A8A49A',
          500: '#6B6B6B',
          600: '#525252',
          700: '#3D3D3D',
          800: '#262626',
          900: '#171717',
        },
        // Keep brand-blue for backwards compatibility
        'brand-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
