/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'rosa-claro': '#FFB7C5',
        'branco-neve': '#FFFAFA',
      }
    },
  },
  plugins: [],
}