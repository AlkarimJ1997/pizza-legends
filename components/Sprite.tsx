'use client';

import { useEffect, useRef, useState } from 'react';
import { SHADOW } from '@/utils/consts';
import NextImage from 'next/image';

interface SpriteProps {
	skinSrc: Skin;
	frameCoord: [number, number];
}

const Sprite = ({ skinSrc, frameCoord }: SpriteProps) => {
	const [skinImage, setSkinImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!skinSrc) return;

		const image = new Image();

		image.src = skinSrc;
		image.onload = () => setSkinImage(image);
	}, [skinSrc]);

	useEffect(() => {
		if (!skinImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		// Clear out anything in the canvas
		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the skin image
		const [frameX, frameY] = frameCoord;

		ctx?.drawImage(skinImage, frameX * 32, frameY * 32, 32, 32, 0, 0, 32, 32);
	}, [skinImage, frameCoord]);

	return (
		<div className='relative left-[-7px]'>
			<NextImage
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
