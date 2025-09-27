/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // сканируем весь исходник
  ],
  theme: {
    extend: {
      fontFamily: {
        // теперь "font-sans" = Myriad Pro
        sans: ['Myriad_Pro', 'ui-sans-serif', 'system-ui'],
        // а "font-serif" = Minion Pro
        serif: ['Minion_Pro', 'ui-serif', 'Georgia'],
      },
    },
  },
  plugins: [],
};
