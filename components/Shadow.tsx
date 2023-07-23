import { useState, useEffect, useRef } from 'react';
import { SHADOW } from '@/utils/consts';

const Shadow = () => {
	const [shadowImage, setShadowImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const shadow = new Image();

		shadow.src = SHADOW;
		shadow.onload = () => setShadowImage(shadow);
	}, []);

	useEffect(() => {
		if (!shadowImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		// Clear out anything in the canvas
		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the shadow image
		ctx?.drawImage(shadowImage, 0, 0, 32, 32, 0, 0, 32, 32);
	}, [shadowImage]);

	return <canvas ref={canvasRef} className='canvas' width={32} height={32} />;
};

export default Shadow;
