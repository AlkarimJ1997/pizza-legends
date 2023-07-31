import clsx from 'clsx';

interface MenuProps {
	options: PageOption[];
	inBattle: boolean;
}

const Menu = ({ options, inBattle = false }: MenuProps) => {
	return (
		<div
			className={clsx(
				'absolute border border-slate-400 bg-slate-800',
				inBattle && 'right-0 bottom-0 w-[140px]'
			)}>
			{options.map(({ label, description, disabled, handler, right }, i) => (
				<div key={i} className='relative'>
					<button
						disabled={!!disabled}
						className='flex items-center w-full text-left h-[20px] cursor-pointer p-0 pl-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500'>
						{label}
					</button>
					<span className='absolute top-0 bottom-0 right-0'>{right?.()}</span>
				</div>
			))}
			<p className='DescriptionBox'>I will provide information!</p>
		</div>
	);
};

export default Menu;
