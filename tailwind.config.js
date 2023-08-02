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
				battlePixelImage: 'calc(var(--battle-pixel-size) * 2)',
			},
			animation: {
				'fade-in': 'fade-in 0.5s forwards',
				'fade-out': 'fade-out 0.5s forwards',
				blink: 'blink 0.3s steps(2, start) infinite',
				'spin-right': 'spin-right 0.8s',
				'spin-left': 'spin-left 0.8s',
				'glob-right': 'glob-right 1s forwards',
				'glob-left': 'glob-left 1s forwards',
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
				'glob-right': {
					'0%': { transform: 'translate3d(0, 0, 0) scale(0.5)', opacity: 1 },
					'50%': {
						transform: 'translate3d(10px, -80px, 0) scale(1)',
						opacity: 1,
					},
					'80%': {
						transform: 'translate3d(149px, -47px, 0) scale(1)',
						opacity: 1,
					},
					'100%': {
						transform: 'translate3d(149px, -47px, 0) scale(3)',
						opacity: 0,
					},
				},
				'glob-left': {
					'0%': { transform: 'translate3d(0, 0, 0) scale(0.5)', opacity: 1 },
					'50%': {
						transform: 'translate3d(-10px, -50px, 0) scale(1)',
						opacity: 1,
					},
					'80%': {
						transform: 'translate3d(-174px, 47px, 0) scale(1)',
						opacity: 1,
					},
					'100%': {
						transform: 'translate3d(-174px, 47px, 0) scale(3)',
						opacity: 0,
					},
				},
			},
		},
	},
	plugins: [],
};
