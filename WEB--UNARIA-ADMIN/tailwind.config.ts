import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1B4F72',
          'blue-dark': '#154060',
          'blue-light': '#2E86C1',
          coral: '#E74C3C',
          teal: '#1ABC9C',
          'teal-dark': '#17A589',
          cream: '#FDFEFE',
          gray: '#F8F9FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)',
      },
    },
  },
  plugins: [],
}

export default config
