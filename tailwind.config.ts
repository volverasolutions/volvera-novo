import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'neon-blue': '#38BDF8',
          'electric-blue': '#2563EB',
          'vibrant-purple': '#9333EA',
          'neon-purple': '#C026D3',
          dark: '#050505',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56,189,248,0.3), 0 0 60px rgba(56,189,248,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(147,51,234,0.5), 0 0 80px rgba(147,51,234,0.2)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #38BDF8, #9333EA)',
        'gradient-brand-r': 'linear-gradient(135deg, #2563EB, #C026D3)',
        'gradient-dark': 'linear-gradient(135deg, #050505, #0a0a1a)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
