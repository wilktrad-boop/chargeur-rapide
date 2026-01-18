import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0EA5E9',
        primaryHover: '#0284C7',
        accent: '#22C55E',
        textMain: '#1F2937',
        textStrong: '#0F172A',
        bg: '#FFFFFF',
        bgSubtle: '#F8FAFC',
        border: '#E5E7EB',
      },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-newsreader)']
      }
    }
  },
  plugins: [typography]
};

export default config;



