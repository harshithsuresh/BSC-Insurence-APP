module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      90: '90vh;',
    },
    colors: {
      background: '#202125',
      surface: '#333237',
      secondary: '#708090',
      onBackground: '#9a9ea6',
      onSurface: '#e8e9ed',
      onPrimary: '#212121',
      onSecondary: '#ffd43b',
      white: '#FFFAFA',
      red: '#FF0000',
      gray: '#FFFAFA',
      black: '#000000',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
