/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'retro-blue': '#1e3a5f',
        'retro-gold': '#d4a853',
        'retro-red': '#c94a4a',
        'retro-bg': '#f5f0e6',
        'retro-dark': '#2c2c2c',
        'retro-border': '#8b7355',
      },
      fontFamily: {
        'retro': ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
