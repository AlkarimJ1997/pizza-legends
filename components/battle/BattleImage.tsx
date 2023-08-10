import clsx from 'clsx';

/* eslint-disable @next/next/no-img-element */
interface BattleImageProps {
	src: string;
	alt: string;
	className?: string;
}

const BattleImage = ({ src, alt, className }: BattleImageProps) => {
	return (
		<div
			className={`absolute scale-[2] w-8 h-8 overflow-hidden ${className}`}
			style={{
				backgroundImage: `url(/images/characters/shadow.png)`,
				backgroundRepeat: 'no-repeat no-repeat',
			}}>
			<img src={src} alt={alt} className='pointer-events-none max-w-none' />
		</div>
	);
};

export default BattleImage;
