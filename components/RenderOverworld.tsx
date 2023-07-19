'use client';

import { useState, useEffect } from 'react';
import { OverworldState } from '@/classes/OverworldState';
import BackgroundLayer from '@/components/BackgroundLayer';
import PlacementsLayer from '@/components/PlacementsLayer';
import { MAPS } from '@/utils/consts';

const RenderOverworld = () => {
	const [overworld, setOverworld] = useState<Overworld | null>(null);

	useEffect(() => {
		// Create and subscribe to overworld state changes
		const overworldState = new OverworldState(
			'DemoRoom',
			(newState: Overworld) => {
				setOverworld(newState);
			}
		);

		// Get initial overworld state
		setOverworld(overworldState.getState());

		return () => overworldState.destroy();
	}, []);

	if (!overworld) return null;

	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<div className='h-gameHeight w-gameWidth scale-pixelSize'>
				<BackgroundLayer overworld={overworld} />
				<PlacementsLayer overworld={overworld} />
			</div>
		</div>
	);
};

export default RenderOverworld;
