interface HealthBarProps {
	hp: number;
}

const HealthBar = ({ hp }: HealthBarProps) => {
	return (
		<svg
			viewBox='0 0 26 3'
			className='absolute w-[26.5px] h-[3px] left-[19.5px] top-[4px] [&>rect]:transition-all [&>rect]:duration-200'>
			<rect x={0} y={0} width={`${hp}%`} height={1} fill='#82ff71' />
			<rect x={0} y={1} width={`${hp}%`} height={2} fill='#3ef126' />
		</svg>
	);
};

export default HealthBar;
