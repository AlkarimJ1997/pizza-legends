import { useEffect } from 'react';

const useKeyPress = (key: 'ArrowUp' | 'ArrowDown', callback: () => void) => {
	useEffect(() => {
		if (!key || !callback) return;

		const keyHandler = (event: KeyboardEvent) => {
			if (event.key === key) {
				event.preventDefault();
				callback();
			}
		};

		document.addEventListener('keydown', keyHandler);

		return () => document.removeEventListener('keydown', keyHandler);
	}, [key, callback]);
};

export default useKeyPress;
