import colors from 'tailwindcss/colors'
import { spacing } from 'tailwindcss/defaultTheme'

module.exports = {
  content: [
    './src/page/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      'xs': '300px',
      // => @media (min-width: 640px) { ... }
      'sm': '435px',

      'nm': '555px',

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1300px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    spacing: {
      ...spacing,
      '18': '76px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      ...colors,
      primary: '#1156fb',
      darkPrimary: '#1A4BBD',
      deepPrimary: '#092669',
      aboutCardBG: '#ec4899',
      transBlack: 'rgb(0,0,0,0.6)',
      transBlack2: 'rgba(7,7,7)'
    }
  },
  plugins: []
}
