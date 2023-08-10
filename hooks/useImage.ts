import { useEffect, useRef, useState } from 'react';

const useImage = (skinSrc: Skin, frameCoord: [number, number]) => {
	const [skinImage, setSkinImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!skinSrc) return;

		const img = new Image();

		img.src = skinSrc;
		img.onload = () => setSkinImage(img);
	}, [skinSrc]);

	useEffect(() => {
		if (!skinImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the skin image
		const [frameX, frameY] = frameCoord;

		ctx?.drawImage(skinImage, frameX * 32, frameY * 32, 32, 32, 0, 0, 32, 32);
	}, [skinImage, frameCoord]);

	return canvasRef;
};

export default useImage;
