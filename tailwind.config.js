/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        dark: "#2C343E",
        darker: "#292E34",
        nav: "#445262",
        navButton: "#5A6879",
        danger: "#F32013",
        list: "#394351",
        na: "#B8B8B8",
        link: "#3790FF",
        av: "#58c75b",
        imp: "#fff700"
      }
    },
    fontFamily: {
      title: ["wix-bold"],
      navButton: ["wix-reg"]
    }
  },
  plugins: [],
}

