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
        gold: {
          50: '#FFF9E5',
          100: '#FFF2CC',
          200: '#FFE699',
          300: '#FFD966',
          400: '#FFCD33',
          500: '#FFC000',
          600: '#CC9A00',
          700: '#997300',
          800: '#664D00',
          900: '#332600',
        },
      },
    },
  },
  plugins: [],
}
export default config
