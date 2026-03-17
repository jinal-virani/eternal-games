/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      animation: {
        'slow-pulse': 'pulse 0.1s cubic-bezier(0.4, 0, 0.6, 1) 1'
      }
    },
    plugins: []
  }
}
