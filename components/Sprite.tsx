/* eslint-disable @next/next/no-img-element */
import { DIRECTIONS, SHADOW } from '@/utils/consts';
import clsx from 'clsx';

interface SpriteProps {
	skinSrc: Skin;
  isMoving: boolean;
	direction: Direction;
}

const Sprite = ({ skinSrc, isMoving, direction }: SpriteProps) => {
	return (
		<div className='relative left-[-7px] w-8 h-8 overflow-hidden'>
			<img src={SHADOW} alt='Shadow' className='absolute pixelart max-w-none' />
			<img
				src={skinSrc}
				alt='Character'
				className={clsx(
					'pixelart absolute max-w-none',
					isMoving && 'animate-walk',
					direction === DIRECTIONS.RIGHT && '-top-8',
					direction === DIRECTIONS.UP && '-top-16',
					direction === DIRECTIONS.LEFT && '-top-24'
				)}
			/>
		</div>
	);
};

export default Sprite;
