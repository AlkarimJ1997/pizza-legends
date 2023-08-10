import { useState, useRef, useEffect } from 'react';

const useImage = (imageSrc: Skin | MapSrc, frameCoord?: [number, number]) => {
	const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!imageSrc) return;

		const img = new Image();

		img.src = imageSrc.toString();
		img.onload = () => setLoadedImage(img);
	}, [imageSrc]);

	useEffect(() => {
		if (!loadedImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the image, if frameCoord is provided, draw only the frame
		if (!frameCoord) {
			ctx?.drawImage(loadedImage, 0, 0);
			return;
		}

		const [frameX, frameY] = frameCoord;

		ctx?.drawImage(loadedImage, frameX * 32, frameY * 32, 32, 32, 0, 0, 32, 32);
	}, [loadedImage, frameCoord]);

	return canvasRef;
};

export default useImage;
