import { useState, useEffect, useRef } from 'react';

interface LevelBackgroundLayerProps {
	level: Level;
}

const LevelBackgroundLayer = ({ level }: LevelBackgroundLayerProps) => {
	const [lowerImage, setLowerImage] = useState<HTMLImageElement | null>(null);
	const [upperImage, setUpperImage] = useState<HTMLImageElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!level.map) return;

		const image = new Image();

		image.src = level.map.lowerSrc;
		image.onload = () => setLowerImage(image);

		const image2 = new Image();

		image2.src = level.map.upperSrc;
		image2.onload = () => setUpperImage(image2);
	}, [level.map]);

	useEffect(() => {
		if (!lowerImage || !upperImage || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		// Clear out anything in the canvas
		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the map image
		ctx?.drawImage(lowerImage, 0, 0);
		ctx?.drawImage(upperImage, 0, 0);
	}, [lowerImage, upperImage]);

	return (
		<div className='absolute'>
			{lowerImage && (
				<canvas
					ref={canvasRef}
					className='canvas'
					width={lowerImage.width}
					height={lowerImage.height}
				/>
			)}
		</div>
	);
};

export default LevelBackgroundLayer;