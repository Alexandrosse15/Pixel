import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#FF4500',
        'brand-light': '#FF6A33',
        'brand-dark': '#CC3700',
        bg: {
          base: '#0A0A0A',
          surface: '#111111',
          card: '#161616',
          elevated: '#1E1E1E',
        },
        ink: {
          primary: '#FFFFFF',
          secondary: '#B0B0B0',
          muted: '#666666',
          subtle: '#333333',
        },
        line: '#242424',
        // Palette boisée, utilisée par le jeu "The Defense" (creation-equipe/the-defense)
        bois: {
          50: '#faf3e7',
          100: '#f0e0c4',
          200: '#e0c08a',
          300: '#caa05a',
          400: '#a87b35',
          500: '#8a5e24',
          600: '#6e481b',
          700: '#553616',
          800: '#3c2611',
          900: '#2a1a0c',
        },
        laiton: '#c9a04a',
        encre: '#1c150d',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        prose: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        pretoire: '0 10px 40px -10px rgba(0,0,0,0.6)',
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.3em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-brand': 'pulse-brand 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'pulse-brand': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
