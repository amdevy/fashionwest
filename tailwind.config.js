/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#6b3b40',
        forest: '#2f4033',
        sage: '#848d7f',
        beige: '#cfc6bd',
        'light-gray': '#d9d9d9',
        'off-white': '#f5f5f4',
      },
      fontFamily: {
        heading: ['"Bodoni Moda"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
