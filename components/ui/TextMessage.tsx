import clsx from 'clsx';

interface TextMessageProps {
	overworld: OverworldChanges;
}

const TextMessage = ({ overworld }: TextMessageProps) => {
	if (!overworld.message) return null;

	const { characters } = overworld.message.revealingText;

	return (
		<div
			className={clsx(
				'p-0.5 text-[5px] rounded-sm bg-slate-700 text-slate-100 min-h-[25px] shadow-xl border border-indigo-400 absolute bottom-0',
				overworld.battle ? 'w-[352px]' : 'w-[180px]'
			)}>
			{characters.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
			<div className='absolute bottom-0 right-1 text-[10px] leading-none'>
				{['.', '.', '.'].map((char, i) => (
					<span
						key={i}
						className='animate-pulse'
						style={{
							animationDelay: `${i * 0.5}s`,
						}}>
						{char}
					</span>
				))}
			</div>
		</div>
	);
};

export default TextMessage;
