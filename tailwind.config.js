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
				battleWidth: 'var(--battle-viewport-width)',
			},
			height: {
				gameHeight: 'var(--game-viewport-height)',
				battleHeight: 'var(--battle-viewport-height)',
			},
			scale: {
				pixelSize: 'var(--pixel-size)',
				battlePixelSize: 'var(--battle-pixel-size)',
			},
			animation: {
				'fade-in': 'fade-in 0.5s forwards',
				'fade-out': 'fade-out 0.5s forwards',
				blink: 'blink 0.3s steps(2, start) infinite',
				'spin-right': 'spin-right 0.8s',
				'spin-left': 'spin-left 0.8s',
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
				blink: {
					to: { visibility: 'hidden' },
				},
				'spin-right': {
					'0%': { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(2)' },
					'25%': {
						transform: 'translate3d(135px, -30px, 0) rotate(45deg) scale(2)',
					},
					'100%': { transform: 'translate3d(0, 0, 0) scale(2)' },
				},
				'spin-left': {
					'0%': { transform: 'translate3d(0, 0, 0) rotate(0deg) scale(2)' },
					'25%': {
						transform: 'translate3d(-100%, 25%, 0) rotate(45deg) scale(2)',
					},
					'100%': { transform: 'translate3d(0, 0, 0) scale(2)' },
				},
			},
		},
	},
	plugins: [],
};
