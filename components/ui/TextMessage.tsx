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
				'py-1 px-2 rounded-md bg-slate-700 text-slate-100 shadow-xl border-2 border-indigo-400 absolute bottom-16 w-[40vw]',
				overworld.battle && 'min-h-[15vh] text-lg',
				!overworld.battle && 'min-h-[15vh] text-lg'
			)}>
			{characters.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
			<div
				className={clsx(
					'absolute bottom-1 right-2 text-4xl leading-none',
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
