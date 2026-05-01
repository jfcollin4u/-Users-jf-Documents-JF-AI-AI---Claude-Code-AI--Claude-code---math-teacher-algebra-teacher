/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        parchment: { 50: '#fbf6e9', 100: '#f6ecd0', 200: '#ecddae', 300: '#dec88a' },
        ink:       { 900: '#1f1633', 700: '#3a2c5c', 500: '#6b5e87', 400: '#8a7eaa' },
        wizard:    { DEFAULT: '#5b3fb8', dark: '#46309a', light: '#8b6fe0' },
        gold:      { DEFAULT: '#e8a544', dark: '#c98a2e', light: '#f4c878' },
        emerald:   { DEFAULT: '#3fa68c', dark: '#2f8770' },
        rose:      { DEFAULT: '#d96b8c', dark: '#b34a6c' },
        teal:      { DEFAULT: '#3fa6b8' },
      },
      boxShadow: {
        scroll: '0 2px 0 rgba(31,22,51,0.08), 0 12px 28px -10px rgba(31,22,51,0.18)',
        pop:    '0 4px 0 rgba(31,22,51,0.15)',
        deep:   '0 6px 0 rgba(31,22,51,0.18), 0 18px 30px -12px rgba(31,22,51,0.25)',
      },
    },
  },
  plugins: [],
};
