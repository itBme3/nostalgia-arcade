
const gray = {
    "gray-50": "#e0e1e2",
    "gray-100": "#babbc3",
    "gray-200": "#9497a6",
    "gray-300": "#717489",
    "gray-400": "#5a5d77",
    "gray-500": "#4a4d63",
    "gray-600": "#3b3d50",
    "gray-700": "#2c2e3e",
    "gray-800": "#1c1c24",
    "gray-900": "#101015"
}
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{svelte,js,ts,html,scss,css}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },
		extend: {
			fontFamily: {
				arcade: '"Press Start 2P"',
      },
      colors: {
        ...gray
      }
      
		},
	},
	plugins: [],
};
