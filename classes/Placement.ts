import { OverworldEvent } from '@/classes/OverworldEvent';
import { CELL_SIZE, DIRECTIONS, PLACEMENT_TYPES } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';

export abstract class Placement {
	id: string | null = null;
	type: PlacementType;
	x: number;
	y: number;
	skin: Skin;
	overworld: OverworldState;

	// Movement
	travelPixelsPerFrame: number = 1;
	movingPixelsRemaining: number = 0;
	movingPixelDirection: Direction;

	// Behavior
	behaviorLoop: BehaviorEvent[];
	behaviorLoopIndex: number;

	isStanding: boolean = false;

	constructor(properties: PlacementConfig, overworld: OverworldState) {
		this.type = properties.type ?? PLACEMENT_TYPES.PERSON;
		this.x = properties.x;
		this.y = properties.y;
		this.skin = properties.skin;
		this.overworld = overworld;

		// Movement
		this.movingPixelDirection = properties.direction ?? DIRECTIONS.DOWN;

		// Behavior
		this.behaviorLoop = properties.behaviorLoop ?? [];
		this.behaviorLoopIndex = 0;

		this.mount();
	}

	mount() {
		this.overworld.addWall(this.x, this.y);

		setTimeout(() => {
			this.doBehaviorEvent();
		}, 10);
	}

	async doBehaviorEvent() {
		if (
			this.overworld.isCutscenePlaying ||
			this.behaviorLoop.length === 0 ||
			this.isStanding
		) {
			return;
		}

		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id ?? '';

		const eventHandler = new OverworldEvent({
			overworld: this.overworld,
			event: eventConfig,
		});
		await eventHandler.init();

		this.behaviorLoopIndex++;

		if (this.behaviorLoopIndex >= this.behaviorLoop.length) {
			this.behaviorLoopIndex = 0;
		}

		this.doBehaviorEvent();
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

	tick() {}

	abstract renderComponent(): React.ReactNode;
}
