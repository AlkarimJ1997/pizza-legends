import { CELL_SIZE } from '@/utils/consts';
import Sprite from '@/components/Sprite';

interface PlacementsLayerProps {
	overworld: Overworld;
}

const PlacementsLayer = ({ overworld }: PlacementsLayerProps) => {
	return (
		<div>
			{overworld.placements.map(placement => {
				const xPos = `${placement.x * CELL_SIZE}px`;
				const yPos = `${placement.y * CELL_SIZE}px`;
				const styles = {
					transform: `translate3d(${xPos}, ${yPos}, 0)`,
				};

				return (
					<div key={placement.id} className='absolute' style={styles}>
						<Sprite skinSrc={placement.skin} direction={placement.direction} />
					</div>
				);
			})}
		</div>
	);
};

export default PlacementsLayer;
