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
			className={clsx(
				'p-[2px] rounded-sm bg-slate-700 text-slate-100 shadow-xl border border-indigo-400 absolute text-[4px] w-[120px] bottom-0 left-0 right-0 mx-auto min-h-[50px]',
				overworld.battle && '',
				!overworld.battle && ''
			)}>
			{characters.map(({ char, show }, i) => (
				<span
					key={i}
					className={clsx('select-none', show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
			<div className='absolute bottom-0.5 right-0.5 animate-pulse'>
				<SpeechBubble />
			</div>
		</div>
	);
};

export default TextMessage;
