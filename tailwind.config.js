/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff3a41",
          dark: "#cc2e33",
        },
        "primary-dark": "#cc2e33",
      },
    },
  },
  plugins: [],
};
