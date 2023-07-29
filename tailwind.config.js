/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			width: {
				gameWidth: 'var(--game-viewport-width)',
			},
			height: {
				gameHeight: 'var(--game-viewport-height)',
			},
			scale: {
				pixelSize: 'var(--pixel-size)',
			},
			animation: {
				'fade-in': 'fade-in 0.5s forwards',
				'fade-out': 'fade-out 0.5s forwards',
			},
			keyframes: {
				'fade-in': {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				'fade-out': {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
			},
		},
	},
	plugins: [],
};
