interface PlacementsLayerProps {
	overworld: OverworldChanges;
}

const PlacementsLayer = ({ overworld }: PlacementsLayerProps) => {
	if (overworld.battle) return null;

	return (
		<div>
			{overworld.placements
				.sort((a, b) => a.y - b.y)
				.map(placement => {
					const [x, y] = placement.displayXY();
					const styles = {
						transform: `translate3d(${x}px, ${y}px, 0)`,
					};

					return (
						<div key={placement.id} className='absolute' style={styles}>
							{placement.renderComponent()}
						</div>
					);
				})}
		</div>
	);
};

export default PlacementsLayer;
