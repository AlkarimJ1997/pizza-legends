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
		},
	},
	plugins: [],
};
