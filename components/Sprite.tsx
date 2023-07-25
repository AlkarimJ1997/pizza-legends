'use client';

import { useEffect, useRef, useState } from 'react';

type DefaultProps = {
	imageSrc: Skin;
};

type OverloadProps = {
	imageSrc: Skin;
	frameCoord: [number, number];
};

type SpriteProps = DefaultProps | OverloadProps;

const Sprite = ({ imageSrc, ...props }: SpriteProps) => {
	const [skinImage, setSkinImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!imageSrc) return;

		const image = new Image();

		image.src = imageSrc;
		image.onload = () => setSkinImage(image);
	}, [imageSrc]);

	useEffect(() => {
		if (!skinImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		// Clear out anything in the canvas
		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the skin image
		const [frameX, frameY] = 'frameCoord' in props ? props.frameCoord : [0, 0];

		ctx?.drawImage(skinImage, frameX * 32, frameY * 32, 32, 32, 0, 0, 32, 32);
	}, [skinImage, props]);

	return (
		<div className='relative left-[-7px]'>
			<canvas
				ref={canvasRef}
				className='absolute canvas'
				width={32}
				height={32}
			/>
		</div>
	);
};

export default Sprite;
