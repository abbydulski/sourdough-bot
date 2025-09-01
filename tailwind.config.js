/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'sourdough': {
            50: '#fdf8f0',
            100: '#f8e6d3',
            200: '#f0cfa7',
            300: '#e8b778',
            400: '#deb887',
            500: '#cd853f',
            600: '#b8722c',
            700: '#a0522d',
            800: '#8b4513',
            900: '#654321',
          }
        },
        fontFamily: {
          'serif': ['Georgia', 'serif'],
        }
      },
    },
    plugins: [],
  }