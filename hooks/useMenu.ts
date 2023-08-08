import { useState, useEffect, useRef } from 'react';
import useKeyPress from '@/hooks/useKeyPress';

const useMenu = ({ options }: { options: PageOption[] }) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(0);
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	useEffect(() => {
		if (buttonRefs.current.length === 0) return;

		setFocusedIndex(0);
		buttonRefs.current[0]?.focus();
	}, [options]);

	useKeyPress('ArrowUp', () => {
		if (focusedIndex === 0) return;

		setFocusedIndex(idx => idx - 1);
		buttonRefs.current[focusedIndex - 1]?.focus();
	});

	useKeyPress('ArrowDown', () => {
		if (focusedIndex === options.length - 1) return;

		setFocusedIndex(idx => idx + 1);
		buttonRefs.current[focusedIndex + 1]?.focus();
	});

	const handleFocus = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
		setFocusedIndex(i);
		e.currentTarget.focus();
	};

	return { focusedIndex, buttonRefs, handleFocus };
};

export default useMenu;
