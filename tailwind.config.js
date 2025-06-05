/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from 'tailwind-scrollbar-hide'

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [tailwindScrollbarHide],
}

export default config
