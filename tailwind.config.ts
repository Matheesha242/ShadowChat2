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
        darkBg: '#0B132B',
        darkCard: '#1C2541',
        neonBlue: '#48CAE4',
        electricCyan: '#0077B6',
        whitePure: '#FFFFFF',
        offWhite: '#E0E0E0',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { textShadow: '0 0 4px #48CAE4, 0 0 8px #48CAE4' },
          '50%': { textShadow: '0 0 12px #48CAE4, 0 0 20px #0077B6' },
        },
      },
    },
  },
  plugins: [],
}
export default config
