import { useEffect } from 'react';

const useKeyPress = (key: 'ArrowUp' | 'ArrowDown', callback: () => void) => {
	useEffect(() => {
		if (!key || !callback) return;

		const keyHandler = (event: KeyboardEvent) => {
			event.key === key && callback();
		};

		document.addEventListener('keydown', keyHandler);

		return () => document.removeEventListener('keydown', keyHandler);
	}, [key, callback]);
};

export default useKeyPress;
