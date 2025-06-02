// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],  // Add your font here
      },
      colors: {
        primary: '#6A994E', // Forest Green
        secondary: '#A7C957', // Olive
        background: '#FFFBEA', // Cream
        text: '#2F2F2F', // Rich Black
        accent: '#BC4749', // Rust Red
      },
    },
  },
  plugins: [],
};
