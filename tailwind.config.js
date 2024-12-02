/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#070b10", // Background color
        "dark-card": "#13181f", // Card color
        "dark-text": "#e4e4e7", // Text color
      },
    },
  },
  darkMode: "class", // Enable class-based dark mode
};