/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"  // <-- make sure this matches your project files
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1B1B1B",
        "light-white": "rgba(255,255,255,0.18)"
      },
    },
  },
  plugins: [],
}
