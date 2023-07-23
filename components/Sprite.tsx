'use client';

import { useEffect, useRef, useState } from 'react';
import { X_NUDGE } from '@/utils/consts';
import Shadow from '@/components/Shadow';

interface SpriteProps {
	skinSrc: Skin;
	frameCoord: [number, number];
	showShadow?: boolean;
}

const Sprite = ({ skinSrc, frameCoord, showShadow = true }: SpriteProps) => {
	const [skinImage, setSkinImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!skinSrc) return;

		const image = new Image();

		image.src = skinSrc;
		image.onload = () => setSkinImage(image);
	}, [skinSrc, showShadow]);

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
		<div className='relative'>
			<div className='absolute'>{showShadow && <Shadow />}</div>
			<div className={`absolute left-[-${X_NUDGE}px]`}>
				<canvas
					ref={canvasRef}
					className='absolute canvas'
					width={32}
					height={32}
				/>
			</div>
		</div>
	);
};

export default Sprite;
