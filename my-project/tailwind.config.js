/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: '"Nunito", serif',
        chakra: '"Chakra Petch", serif',
        quicksand: '"Quicksand", serif',
        josefin: '"Josefin Sans", sans-serif',
        space: '"Space Grotesk", serif',
        orbitron: '"Orbitron", serif',
      }
    },
  },
  plugins: [],
}