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
        'deep-red': '#ff6c6c',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'handwritten': ['Reenie Beanie', 'cursive'],
      },
    },
  },
  plugins: [],
}
