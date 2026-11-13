/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        panel: "#141416",
        line: "#2a2a2e",
        muted: "#8f8f98",
        accent: "#ccff00",
      },
      fontFamily: {
        display: ["Oswald", "Impact", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
