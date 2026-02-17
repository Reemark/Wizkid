/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'Segoe UI', 'sans-serif'],
        body: ['Space Grotesk', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        ink: '#03050b',
        navy: '#071126',
        gold: '#d8b56f',
        emerald: '#2fb07f',
      },
      boxShadow: {
        keynote: '0 25px 80px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        noise: "radial-gradient(rgba(255,255,255,0.08) 0.7px, transparent 0.7px)",
      },
    },
  },
  plugins: [],
};
