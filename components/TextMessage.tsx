import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

interface TextMessageProps {
	overworld: OverworldChanges;
}

const TextMessage = ({ overworld }: TextMessageProps) => {
	const [chars, setChars] = useState<RevealingCharacter[]>([]);
	const [isDone, setIsDone] = useState<boolean>(false);

	useEffect(() => {
		if (!overworld.message) return;

		setChars([...overworld.message.revealingText.characters]);
	}, [overworld.message]);

	useEffect(() => {
		if (chars.length === 0) return;

		const revealInterval = setInterval(() => {
			const next = chars.find(c => !c.show);

			if (!next) {
				clearInterval(revealInterval);
				setIsDone(true);
				return;
			}

			const updatedChars = chars.map(c => {
				return c === next ? { ...c, show: true } : c;
			});

			setChars(updatedChars);
		}, 70);

		return () => clearInterval(revealInterval);
	}, [chars]);

	// const revealOneCharacter = useCallback(() => {
	// 	const next = chars.find(c => !c.show);

	// 	if (!next) {
	// 		setIsDone(true);
	// 		return;
	// 	}

	// 	const updatedChars = chars.map(c => {
	// 		return c === next ? { ...c, show: true } : c;
	// 	});

	// 	setChars(updatedChars);
	// 	setTimeout(() => revealOneCharacter(), next.delayAfter);
	// }, [chars]);

	// useEffect(() => {
	// 	if (chars.length === 0) return;

	// 	revealOneCharacter();
	// }, [chars, revealOneCharacter]);

	useEffect(() => {
		if (!isDone) return;

		console.log('done revealing text');
	}, [isDone]);

	if (!overworld.message) return null;

	return (
		<div className='p-0.5 text-[5px] rounded-sm bg-slate-700 text-slate-100 w-full min-h-[25px] shadow-xl border border-slate-300 absolute bottom-0'>
			{chars.map(({ char, show }, i) => (
				<span key={i} className={clsx(show ? 'opacity-100' : 'opacity-0')}>
					{char}
				</span>
			))}
		</div>
	);
};

export default TextMessage;
