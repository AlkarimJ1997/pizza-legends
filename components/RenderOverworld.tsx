'use client';

import { useState, useEffect } from 'react';
import { OverworldState } from '@/classes/OverworldState';
import BackgroundLayer from '@/components/BackgroundLayer';
import PlacementsLayer from '@/components/PlacementsLayer';
import TextMessage from '@/components/ui/TextMessage';
import SceneChange from '@/components/ui/SceneChange';
import { setBackgroundColor } from '@/utils/helpers';
import BattleScene from '@/components/battle/BattleScene';
import Container from '@/components/Container';

const RenderOverworld = () => {
	const [overworld, setOverworld] = useState<OverworldChanges | null>(null);

	useEffect(() => {
		// Create and subscribe to overworld state changes
		const overworldState = new OverworldState(
			'DemoRoom',
			(newState: OverworldChanges) => {
				setOverworld(newState);
			}
		);

		// Get initial overworld state
		setOverworld(overworldState.getState());

		return () => overworldState.destroy();
	}, []);

	if (!overworld) return null;

	setBackgroundColor(overworld.id);
	const { cameraTransformX: x, cameraTransformY: y } = overworld;

	return (
		<div className='fixed inset-0 flex items-center justify-center'>
			<Container inBattle={!!overworld.battle}>
				{overworld.battle ? (
					<BattleScene overworld={overworld} />
				) : (
					<div
						style={{
							transform: `translate3d(${x}, ${y}, 0)`,
						}}>
						<BackgroundLayer overworld={overworld} />
						<PlacementsLayer overworld={overworld} />
					</div>
				)}
				<TextMessage overworld={overworld} />
			</Container>
			<SceneChange overworld={overworld} />
		</div>
	);
};

export default RenderOverworld;
