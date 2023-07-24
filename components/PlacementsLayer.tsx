interface PlacementsLayerProps {
	overworld: OverworldChanges;
}

const PlacementsLayer = ({ overworld }: PlacementsLayerProps) => {
	return (
		<div>
			{overworld.placements.map(placement => {
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
