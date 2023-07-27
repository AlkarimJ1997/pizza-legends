interface TextMessageProps {
	overworld: OverworldChanges;
}

const TextMessage = ({ overworld }: TextMessageProps) => {
	if (!overworld.message) return null;

	return (
		<div className='p-0.5 text-[5px] rounded-sm bg-slate-700 text-slate-100 w-full min-h-[25px] shadow-xl border border-slate-300 absolute bottom-0'>
			<p>{overworld.message.text}</p>
		</div>
	);
};

export default TextMessage;
