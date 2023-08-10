import SpeechBubble from '@/assets/SpeechBubble';
import clsx from 'clsx';

interface TextMessageProps {
	overworld: OverworldChanges;
}

const TextMessage = ({ overworld }: TextMessageProps) => {
	if (!overworld.message) return null;

	const { characters } = overworld.message.revealingText;

	return (
		<div
    // text-sm sm:text-lg md:text-xl
			className={clsx(
				'px-[2px] rounded-sm bg-slate-700 text-slate-100 shadow-xl border border-indigo-400 absolute left-0 right-0 mx-auto',
				overworld.battle && 'max-w-[200px] py-[1px] text-[7px] bottom-3',
				!overworld.battle && 'w-[120px] min-h-[50px] text-[4px] bottom-0 py-[0.5px]'
			)}>
			{characters.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
			{!overworld.battle && (
				<div className='absolute bottom-0.5 right-0.5 animate-pulse'>
					<SpeechBubble />
				</div>
			)}
		</div>
	);
};

export default TextMessage;
