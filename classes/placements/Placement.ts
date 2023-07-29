import { CELL_SIZE, DIRECTIONS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';

export abstract class Placement {
	id: string | null = null;
	x: number;
	y: number;
	type: PlacementType;
	overworld: OverworldState;

	// Movement
	travelPixelsPerFrame: number = 1;
	movingPixelsRemaining: number = 0;
	movingPixelDirection: Direction = DIRECTIONS.DOWN;

	// Collision detection
	intentPosition: { x: number; y: number } | null = null;

	// Talking
	talking: StoryConfig[] = [];

	constructor(properties: PlacementConfig, overworld: OverworldState) {
		this.x = properties.x;
		this.y = properties.y;
		this.type = properties.type;
		this.overworld = overworld;

		// Movement
		if ('direction' in properties) {
			this.movingPixelDirection = properties.direction ?? DIRECTIONS.DOWN;
		}

		// Talking
		if ('talking' in properties) {
			this.talking = properties.talking ?? [];
		}
	}

	tick() {}

	tickAttemptAiMove() {}

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

	abstract renderComponent(): React.ReactNode;
}
