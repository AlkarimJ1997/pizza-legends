'use client';

import { useState, useEffect, useRef } from 'react';

interface LevelBackgroundLayerProps {
	level: Level;
}

type MapLayers = {
	lower: HTMLImageElement | null;
	upper: HTMLImageElement | null;
};

const LevelBackgroundLayer = ({ level }: LevelBackgroundLayerProps) => {
	const [mapImages, setMapImages] = useState<MapLayers>({
		lower: null,
		upper: null,
	});

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!level.map) return;

		const loadImage = (src: string, layer: keyof MapLayers) => {
			const image = new Image();

			image.src = src;
			image.onload = () => {
				setMapImages(images => ({ ...images, [layer]: image }));
			};
		};

		loadImage(level.map.lowerSrc, 'lower');
		loadImage(level.map.upperSrc, 'upper');
	}, [level.map]);

	useEffect(() => {
		if (!mapImages.lower || !mapImages.upper || !canvasRef.current) return;

		const canvasEl = canvasRef.current;
		const ctx = canvasEl.getContext('2d');

		// Clear out anything in the canvas
		ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);

		// Draw the map image
		ctx?.drawImage(mapImages.lower, 0, 0);
		ctx?.drawImage(mapImages.upper, 0, 0);
	}, [mapImages]);

	return (
		<div className='absolute'>
			{mapImages.lower && (
				<canvas
					ref={canvasRef}
					className='canvas'
					width={mapImages.lower.width}
					height={mapImages.lower.height}
				/>
			)}
		</div>
	);
};

export default LevelBackgroundLayer;
