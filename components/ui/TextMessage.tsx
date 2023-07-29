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
				'p-0.5 rounded-sm bg-slate-700 text-slate-100 shadow-xl border border-indigo-400 absolute bottom-0 w-full',
				overworld.battle && 'min-h-[35px] text-[8px] px-[3px]',
				!overworld.battle && 'min-h-[25px] text-[5px]'
			)}>
			{characters.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
			<div
				className={clsx(
					'absolute bottom-0 right-1 text-[10px] leading-none',
					overworld.battle && 'hidden'
				)}>
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
