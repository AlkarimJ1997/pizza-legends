import type { OverworldState } from '@/classes/OverworldState';
import { CELL_SIZE, DIRECTIONS, PLACEMENT_TYPES } from '@/utils/consts';

export abstract class Placement {
	id: number;
	type: PlacementType;
	x: number;
	y: number;
	skin: Skin;
	overworld: OverworldState;

	// Movement
	travelPixelsPerFrame: number = 1.5;
	movingPixelsRemaining: number = 0;
	movingPixelDirection: Direction;

	constructor(properties: PlacementConfig, overworld: OverworldState) {
		this.id = properties.id;
		this.type = properties.type ?? PLACEMENT_TYPES.PERSON;
		this.x = properties.x;
		this.y = properties.y;
		this.skin = properties.skin;
		this.overworld = overworld;

		// Movement
		this.movingPixelDirection = properties.direction ?? DIRECTIONS.DOWN;
	}

	displayXY(): [number, number] {
		if (this.movingPixelsRemaining > 0) {
			return this.displayMovingXY();
		}

		const x = this.x * CELL_SIZE;
		const y = this.y * CELL_SIZE;

		return [x, y];
	}

	displayMovingXY(): [number, number] {
		const x = this.x * CELL_SIZE;
		const y = this.y * CELL_SIZE;
		const progressPixels = CELL_SIZE - this.movingPixelsRemaining;

		switch (this.movingPixelDirection) {
			case DIRECTIONS.LEFT:
				return [x - progressPixels, y];
			case DIRECTIONS.RIGHT:
				return [x + progressPixels, y];
			case DIRECTIONS.UP:
				return [x, y - progressPixels];
			default:
				return [x, y + progressPixels];
		}
	}

	isSolidForBody(_body: Placement) {
		return false;
	}

	tick() {}

	abstract renderComponent(): React.ReactNode;
}
