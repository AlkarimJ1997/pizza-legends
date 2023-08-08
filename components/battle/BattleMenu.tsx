import useMenu from '@/hooks/useMenu';
import clsx from 'clsx';

interface BattleMenuProps {
	options: PageOption[];
}

const BattleMenu = ({ options }: BattleMenuProps) => {
	const { focusedIndex, buttonRefs, handleFocus } = useMenu({ options });

	return (
		<div className='text-slate-100'>
			<div className='absolute bg-slate-700 z-10 left-0 right-0 bottom-2 w-[140px] mx-auto'>
				{options.map(({ label, disabled, handler, right }, i) => (
					<div key={i} className='relative flex items-center text-[7px]'>
						<button
							ref={el => (buttonRefs.current[i] = el)}
							disabled={!!disabled}
							onClick={handler}
							onMouseEnter={event => handleFocus(event, i)}
							className={clsx(
								'flex justify-between items-center w-full h-[15px] cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 px-2',
								disabled && 'opacity-50'
							)}>
							{label}
							<span className='text-slate-300'>{right?.()}</span>
						</button>
					</div>
				))}
			</div>
			<div className='absolute -bottom-5 left-0 right-0 p-0.5 bg-slate-700 border border-indigo-400 max-w-[200px] mx-auto rounded-sm'>
				<p className='text-[7px]'>{options[focusedIndex]?.description}</p>
			</div>
		</div>
	);
};

export default BattleMenu;
