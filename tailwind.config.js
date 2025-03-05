/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4c46",
        black: "#141522",
        gray: "#D6DDEB",
        secondColor: "#F8F9FA"
      },
    },
  },
  plugins: [],
}

