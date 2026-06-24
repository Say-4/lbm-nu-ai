/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nuGreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d', // Hijau tua khas NU
          800: '#166534',
          900: '#14532d',
        },
        nuGold: {
          400: '#fbbf24',
          500: '#f59e0b', // Emas khas lambang NU
          600: '#d97706',
        }
      }
    },
  },
  plugins: [],
}
