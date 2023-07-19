import { CELL_SIZE, DIRECTIONS, MAPS, SKINS } from '@/utils/consts';
import Sprite from '@/components/Sprite';
import LevelBackgroundLayer from '@/components/LevelBackgroundLayer';

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
				{level.placements.map(placement => {
					const xPos = `${placement.x * CELL_SIZE}px`;
					const yPos = `${placement.y * CELL_SIZE}px`;
					const styles = {
						transform: `translate3d(${xPos}, ${yPos}, 0)`,
					};

					return (
						<div key={placement.id} className='absolute' style={styles}>
							<Sprite
								skinSrc={placement.skin}
								direction={placement.direction}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RenderLevel;
