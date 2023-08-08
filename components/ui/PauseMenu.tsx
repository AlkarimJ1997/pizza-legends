import useMenu from '@/hooks/useMenu';
import clsx from 'clsx';

interface PauseMenuProps {
	overworld: OverworldChanges;
}

const PauseMenu = ({ overworld }: PauseMenuProps) => {
	const options = overworld.pause?.keyboardMenu?.options ?? [];
	const { focusedIndex, buttonRefs, handleFocus } = useMenu({ options });

	if (!overworld.pause) return null;

	return (
		<div className='absolute inset-0 z-50 grid place-items-center auto-rows-fr'>
			<div className='bg-slate-700 text-slate-100 w-[90%] mx-auto max-w-md p-4 rounded-md shadow-xl'>
				<h2 className='mb-4 text-3xl text-center border-b border-b-slate-400'>
					Pause Menu
				</h2>
				{options.map(({ label, disabled, handler, right }, i) => (
					<div key={i} className='text-lg md:text-2xl'>
						<button
							ref={el => (buttonRefs.current[i] = el)}
							disabled={!!disabled}
							onClick={handler}
							onMouseEnter={event => handleFocus(event, i)}
							className={clsx(
								'flex justify-between items-center w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2',
								disabled && 'opacity-50'
							)}>
							{label}
							<span className='text-slate-300'>{right?.()}</span>
						</button>
					</div>
				))}
			</div>
			<div className='w-[90%] max-w-xl px-4 py-2 mx-auto ring-2 ring-indigo-500 rounded-sm bg-slate-700 text-slate-100'>
				<p className='text-lg md:text-xl'>
					{options[focusedIndex]?.description}
				</p>
			</div>
		</div>
	);
};

export default PauseMenu;
