'use client';

import { SHADOW } from '@/utils/consts';
import Image from 'next/image';
import useImage from '@/hooks/useImage';

interface SpriteProps {
	skinSrc: Skin;
	frameCoord: [number, number];
}

const Sprite = ({ skinSrc, frameCoord }: SpriteProps) => {
	const canvasRef = useImage(skinSrc, frameCoord);

	return (
		<div className='relative left-[-7px]'>
			<Image
				src={SHADOW}
				alt='Shadow'
				className='absolute max-w-none pixelart'
				width={32}
				height={32}
			/>
			<canvas
				ref={canvasRef}
				className='absolute inline-block align-top pixelart'
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Sprite;
