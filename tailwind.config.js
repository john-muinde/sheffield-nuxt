/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c02434",
        secondary: {
          DEFAULT: "#21409a",
          light: "#3b5dac", // Lighter shade
          dark: "#172b6e", // Darker shade
          100: "#e6eaf4", // Lightest shade
          200: "#c0c9e1",
          300: "#99a8cd",
          400: "#7387b9",
          500: "#4d66a5", // Base color
          600: "#3b5dac", // Slightly darker
          700: "#2e4a8a",
          800: "#213768",
          900: "#172b6e", // Darkest shade
        },
      },
      fontFamily: {
        body: ["Nunito"],
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
