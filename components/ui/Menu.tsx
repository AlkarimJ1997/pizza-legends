import { useState } from 'react';
import clsx from 'clsx';

interface MenuProps {
	options: PageOption[];
	inBattle: boolean;
	setPrevFocus: (buttonEl: HTMLButtonElement | null) => void;
}

const Menu = ({ options, inBattle = false, setPrevFocus }: MenuProps) => {
	const [focusedIndex, setFocusedIndex] = useState<number>(0);

	const handleFocus = (
		e: React.MouseEvent<HTMLButtonElement>,
		index: number
	) => {
		setFocusedIndex(index);
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
							disabled={!!disabled}
							onClick={handler}
							onMouseEnter={e => handleFocus(e, i)}
							className='flex items-center w-full text-left h-[20px] cursor-pointer p-0 pl-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500'>
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
