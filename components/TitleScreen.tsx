/* eslint-disable @next/next/no-img-element */
import useMenu from '@/hooks/useMenu';
import clsx from 'clsx';

interface TitleScreenProps {
	options: PageOption[];
}

const TitleScreen = ({ options }: TitleScreenProps) => {
	const { focusedIndex, buttonRefs, handleFocus } = useMenu({ options });

	return (
		<div className='fixed inset-0 grid bg-black place-items-center text-slate-100'>
			<div className='grid place-items-center gap-y-10 sm:gap-y-14 md:gap-y-28 lg:gap-y-44'>
				<img
					src='/images/logo.png'
					alt='Pizza Legends'
					className='pixelart scale-pixelSize'
				/>
				<div>
					{options.map(({ label, disabled, handler, right }, i) => (
						<div key={i} className='text-lg md:text-3xl'>
							<button
								ref={el => (buttonRefs.current[i] = el)}
								disabled={!!disabled}
								onClick={handler}
								onMouseEnter={event => handleFocus(event, i)}
								className={clsx(
									'cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-md px-4 py-2',
									disabled && 'opacity-50'
								)}>
								{label}
								<span className='text-slate-300'>{right?.()}</span>
							</button>
						</div>
					))}
				</div>
			</div>
			<p className='absolute text-lg bottom-4 md:text-2xl md:bottom-16'>
				{options[focusedIndex]?.description}
			</p>
		</div>
	);
};

export default TitleScreen;
