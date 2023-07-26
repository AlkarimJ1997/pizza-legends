interface TextMessageProps {
	text: string;
}

const TextMessage = ({ text }: TextMessageProps) => {
	return (
		<div className='p-1 text-[6px] rounded-sm bg-slate-700 text-slate-100 w-gameWidth min-h-[25px] shadow-xl border border-slate-300'>
			<p>{text}</p>
		</div>
	);
};

export default TextMessage;
