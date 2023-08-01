import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import useKeyPress from '@/hooks/useKeyPress';

interface MenuProps {
	options: PageOption[];
	inBattle: boolean;
}

const Menu = ({ options, inBattle = false }: MenuProps) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(0);
	const focusedButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => setFocusedIndex(0), [options]);

	useEffect(() => {
		focusedButtonRef.current?.focus();
	}, [focusedIndex]);

	useKeyPress('ArrowUp', () => {
		let prevIndex = focusedIndex;

		do {
			prevIndex = (prevIndex - 1 + options.length) % options.length;
		} while (options[prevIndex].disabled && prevIndex !== focusedIndex);

		setFocusedIndex(prevIndex);
	});

	useKeyPress('ArrowDown', () => {
		let nextIndex = focusedIndex;

		do {
			nextIndex = (nextIndex + 1) % options.length;
		} while (options[nextIndex].disabled && nextIndex !== focusedIndex);

		setFocusedIndex(nextIndex);
	});

	const handleFocus = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
		setFocusedIndex(i);
		e.currentTarget.focus();
	};

	return (
		<div className='text-slate-100'>
			<div
				className={clsx(
					'absolute bg-slate-700 z-10',
					inBattle && 'left-0 right-0 bottom-2 w-[140px] mx-auto'
				)}>
				{options.map(({ label, disabled, handler, right }, i) => (
					<div key={i} className='relative'>
						<button
							ref={focusedIndex === i ? focusedButtonRef : null}
							disabled={!!disabled}
							onClick={handler}
							onMouseEnter={event => handleFocus(event, i)}
							className={clsx(
								'flex items-center w-full text-left h-[15px] cursor-pointer pl-2 text-[7px] focus:outline-none focus:ring-1 focus:ring-indigo-500',
								disabled && 'opacity-50'
							)}>
							{label}
						</button>
						<span className='absolute top-0 bottom-0 right-0'>{right?.()}</span>
					</div>
				))}
			</div>
			<div className='absolute -bottom-5 left-0 right-0 p-0.5 bg-slate-700 border border-indigo-400 max-w-[200px] mx-auto rounded-sm'>
				<p className='text-[7px]'>{options[focusedIndex]?.description}</p>
			</div>
		</div>
	);
};

export default Menu;
