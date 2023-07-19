'use client';

import { useEffect, useRef, useState } from 'react';
import { X_NUDGE } from '@/utils/consts';
import Shadow from '@/components/Shadow';

interface SpriteProps {
	skinSrc: Skin;
	direction: Direction;
	showShadow?: boolean;
}

const Sprite = ({ skinSrc, direction, showShadow = true }: SpriteProps) => {
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

		// Draw the skin image and shadow image
		ctx?.drawImage(skinImage, 0, 0, 32, 32, -X_NUDGE, 0, 32, 32);
	}, [skinImage]);

	return (
		<div className='relative'>
			<canvas
				ref={canvasRef}
				className='canvas absolute'
				width={32}
				height={32}
			/>
			<div className='absolute'>{showShadow && <Shadow />}</div>
		</div>
	);
};

export default Sprite;
