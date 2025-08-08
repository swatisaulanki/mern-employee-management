/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'bebasNeue': ['Bebas Neue', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: "#9F294A",
        secondary: "#B69507",
        white: "#fff",
        dark: "#333333",
        transparent: "transparent",
      },
      animation: {
        'slide': 'scroll 15s linear infinite',
        'pulse': 'pulse 1.5s ease-in-out infinite',
        'slideUp': 'slideUp 0.8s ease-out', // 👉 Added here
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulse: {
          '0%': { opacity: 1 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 1 },
        },
        slideUp: { // 👉 Added here
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};
