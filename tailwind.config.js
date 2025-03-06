/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "320px",
        mid: "680px",
        lg: "1920px",
        xl: "2560px",
        "2xl": "3840px",
      },
      colors: {
        main: "#0B2027",
        additional: "#4A4A4A",
        accent: "#DB394B",
        "accent-2": "#86428A",
        bg: "#FCFCFC",
        "bg-darker": "#D9D9D9",
        "accent-3": "00D29D",
      },
      fontFamily: {
        regular: ["Golos Text", "sans-serif"],
        medium: ["Golos Text Medium", "sans-serif"],
        bold: ["Golos Text Bold", "sans-serif"],
        semibold: ["Golos Text Semibold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
