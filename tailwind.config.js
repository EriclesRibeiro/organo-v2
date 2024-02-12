/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'or-dark': '#111012',
        'or-dark-saturated': '#202224',
        'or-snow': '#DEDEDE',
        'or-gray': '#505050',
        'or-lime': '#AEF022',
        'or-lime-darkest': '#9DD81F'
      }
    },
  },
  plugins: [],
}

