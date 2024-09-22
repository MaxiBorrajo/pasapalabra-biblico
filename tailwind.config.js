/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que esto esté configurado para tus archivos
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Establece Poppins como la fuente predeterminada para sans
      },
    },
    backgroundImage: {
      'start': "url('../public/images/background.webp')",
    },
  },
  plugins: [],
};
