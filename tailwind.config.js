/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: "#2C343E",
        nav: "#445262",
        navButton: "#5A6879",
        danger: "#F32013",
        list: "#394351"
      }
    },
    fontFamily: {
      title: ["wix-bold"],
      navButton: ["wix-reg"]
    }
  },
  plugins: [],
}

