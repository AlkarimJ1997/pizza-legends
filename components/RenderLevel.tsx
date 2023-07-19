import { DIRECTIONS, MAPS, SKINS } from '@/utils/consts';
import LevelBackgroundLayer from '@/components/LevelBackgroundLayer';
import LevelPlacementsLayer from '@/components/LevelPlacementsLayer';

const RenderLevel = () => {
	const level = {
		map: MAPS.DemoRoom,
		placements: [
			{ id: 0, x: 5, y: 5, skin: SKINS.HERO, direction: DIRECTIONS.DOWN },
			{ id: 1, x: 2, y: 2, skin: SKINS.NPC1, direction: DIRECTIONS.DOWN },
			{ id: 2, x: 3, y: 3, skin: SKINS.ERIO, direction: DIRECTIONS.DOWN },
		],
	};

	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			<div className='h-gameHeight w-gameWidth scale-pixelSize'>
				<LevelBackgroundLayer level={level} />
				<LevelPlacementsLayer level={level} />
			</div>
		</div>
	);
};

export default RenderLevel;
