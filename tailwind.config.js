/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./<screens>/**/*.{js,jsx,ts,tsx}",
    "./DocumentationScreen.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#2C3E50',
        accent: '#F39C12',
        background: '#F8F9FA',
        surface: '#FFFFFF',
        error: '#E74C3C',
        success: '#2ECC71',
      },
    },
  },
  plugins: [],
} 