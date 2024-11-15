// tailwind.config.js
module.exports = {
  important: true, // This forces Tailwind styles to take precedence
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
