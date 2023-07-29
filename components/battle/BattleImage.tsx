/* eslint-disable @next/next/no-img-element */
interface BattleImageProps {
	src: string;
	alt: string;
	className?: string;
}

const BattleImage = ({ src, alt, className }: BattleImageProps) => {
	return (
		<div
			className={`battle-shadow absolute scale-[2] w-8 h-8 overflow-hidden ${className}`}>
			<img src={src} alt={alt} className='pointer-events-none max-w-none' />
		</div>
	);
};

export default BattleImage;
