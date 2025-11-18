/** @type {import('tailwindcss').Config} */
import { customTheme } from './custom-theme'

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  mode: "jit",
  theme: {
    extend: customTheme
  },
  plugins: [
    require('dompurify'), 
    require('react-router'),
  ],
};
