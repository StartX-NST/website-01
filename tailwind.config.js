/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'rgb(19, 40, 85)',
					foreground: 'rgb(255, 255, 255)',
				},
				background: 'rgb(0, 0, 0)',
				foreground: 'rgb(255, 255, 255)',
				card: {
					DEFAULT: 'rgb(15, 15, 15)',
					foreground: 'rgb(255, 255, 255)',
				},
				muted: {
					DEFAULT: 'rgb(30, 30, 30)',
					foreground: 'rgb(156, 163, 175)',
				},
				border: 'rgb(40, 40, 40)',
			},
			fontFamily: {
				sans: ['Raleway', 'system-ui', 'sans-serif'],
				display: ['Raleway', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'grid-pattern':
					'linear-gradient(to right, rgb(40, 40, 40) 1px, transparent 1px), linear-gradient(to bottom, rgb(40, 40, 40) 1px, transparent 1px)',
				'subtle-pattern':
					'radial-gradient(circle at 50% 50%, rgb(15, 15, 15) 0%, rgb(0, 0, 0) 100%)',
			},
			backgroundSize: {
				'grid-pattern': '50px 50px',
			},
			animation: {
				float: 'float 6s ease-in-out infinite',
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
			},
		},
	},
	plugins: [],
};
