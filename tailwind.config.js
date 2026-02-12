/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#f0f0f0',
        'charcoal': '#1a1a1a',
        'deep-red': '#cc0000',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'handwritten': ['Reenie Beanie', 'cursive'],
      },
    },
  },
  plugins: [],
}
