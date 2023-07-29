import clsx from 'clsx';

interface TextMessageProps {
	overworld: OverworldChanges;
}

const TextMessage = ({ overworld }: TextMessageProps) => {
	if (!overworld.message) return null;

	const { characters } = overworld.message.revealingText;

	return (
		<div className='p-0.5 text-[5px] rounded-sm bg-slate-700 text-slate-100 w-full min-h-[25px] shadow-xl border border-slate-300 absolute bottom-0'>
			{characters.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
		</div>
	);
};

export default TextMessage;
