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
		<div className='bg-slate-800 text-slate-100'>
			<div
				className={clsx(
					'absolute border border-slate-400 bg-slate-800 text-slate-100 z-10',
					inBattle && 'right-0 bottom-0 w-[140px]'
				)}>
				{options.map(({ label, description, disabled, handler, right }, i) => (
					<div key={i} className='relative'>
						<button
							ref={focusedIndex === i ? focusedButtonRef : null}
							disabled={!!disabled}
							onClick={handler}
							onMouseEnter={event => handleFocus(event, i)}
							className={clsx(
								'flex items-center w-full text-left h-[20px] cursor-pointer p-0 pl-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500',
								disabled && 'opacity-50'
							)}>
							{label}
						</button>
						<span className='absolute top-0 bottom-0 right-0'>{right?.()}</span>
					</div>
				))}
			</div>
			<div className='absolute bottom-0 left-0 right-0 p-0.5 text-slate-100 bg-slate-800 border border-slate-400'>
				<p className='text-[10px]'>{options[focusedIndex]?.description}</p>
			</div>
		</div>
	);
};

export default Menu;
