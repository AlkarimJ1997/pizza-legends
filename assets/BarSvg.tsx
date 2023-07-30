import clsx from 'clsx';

interface BarSvgProps {
	data: number;
	viewBox: string;
	primaryFill: string;
	secondaryFill: string;
	className?: string;
}

const BarSvg = ({
	data,
	viewBox,
	primaryFill,
	secondaryFill,
	className,
}: BarSvgProps) => {
	return (
		<svg
			viewBox={viewBox}
			className={clsx(
				'absolute w-[26.5px] left-[19.5px] [&>rect]:transition-all [&>rect]:duration-200',
				className && className
			)}>
			<rect x={0} y={0} width={`${data}%`} height={1} fill={primaryFill} />
			<rect x={0} y={1} width={`${data}%`} height={2} fill={secondaryFill} />
		</svg>
	);
};

export default BarSvg;
