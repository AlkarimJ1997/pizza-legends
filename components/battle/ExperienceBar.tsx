interface ExperienceBarProps {
	xp: number;
}

const ExperienceBar = ({ xp }: ExperienceBarProps) => {
	return (
		<svg
			viewBox='0 0 26 2'
			className='absolute w-[26.5px] h-[2px] left-[19.5px] top-[8px] [&>rect]:transition-all [&>rect]:duration-200'>
			<rect x={0} y={0} width={`${xp}%`} height={1} fill='#ffd76a' />
			<rect x={0} y={1} width={`${xp}%`} height={2} fill='#ffc934' />
		</svg>
	);
};

export default ExperienceBar;
