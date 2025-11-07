/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- make sure this matches your project files
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#1B1B1B",
        "light-white": "rgba(255,255,255,0.18)",
        "light-grey": "rgba(30, 23, 23, 0.18)",
        purple: "#5B3256",
        "light-blue": " rgb(184, 227, 241)",
        // "dark-gray":
        purple: "#50404eff",
      },
    },
  },
  plugins: [],
};
