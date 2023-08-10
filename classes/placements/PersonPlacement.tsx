import { Placement } from '@/classes/placements/Placement';
import {
	EVENTS,
	CELL_SIZE,
	CUSTOM_EVENTS,
	directionUpdateMap,
} from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import { emitEvent } from '@/utils/helpers';
import { ReactNode } from 'react';

export abstract class PersonPlacement extends Placement {
	skin: Skin;

	// Behavior
	behaviorLoop: BehaviorEvent[];
	behaviorLoopIndex: number;

	constructor(config: PersonConfig, overworld: OverworldState) {
		super(config, overworld);

		this.skin = config.skin;

		// Behavior
		this.behaviorLoop = config.behaviorLoop ?? [];
		this.behaviorLoopIndex = 0;
	}

	startBehavior(behavior: WalkEvent | StandEvent) {
		this.movingPixelDirection = behavior.direction;

		if (behavior.type === EVENTS.WALK) {
			if (!this.canMoveToNextDestination(behavior.direction)) {
				behavior.retry && setTimeout(() => this.startBehavior(behavior), 10);
				return;
			}

			this.movingPixelsRemaining = CELL_SIZE;
			this.updateIntentPosition(behavior.direction);
			return;
		}

		if (behavior.type === EVENTS.STAND) {
			setTimeout(() => {
				emitEvent(CUSTOM_EVENTS.STAND, { whoId: this.id! });
			}, behavior.time);
		}
	}

	canMoveToNextDestination(direction: Direction) {
		const { x, y } = directionUpdateMap[direction];
		const nextPosition = { x: this.x + x, y: this.y + y };

		// Is the next space walkable?
		const isOccupied = this.overworld.isPositionOccupied(nextPosition);
		if (isOccupied) return false;

		return true;
	}

	tick() {
		this.tickMovingPixelProgress();
		this.tickAttemptAiMove();
	}

	tickMovingPixelProgress() {
		if (this.movingPixelsRemaining === 0) return;

		this.movingPixelsRemaining -= this.travelPixelsPerFrame;

		if (this.movingPixelsRemaining <= 0) {
			this.movingPixelsRemaining = 0;
			this.onDoneMoving();
			emitEvent(CUSTOM_EVENTS.WALK, { whoId: this.id! });
		}
	}

	onDoneMoving() {
		const { x, y } = directionUpdateMap[this.movingPixelDirection];

		this.x += x;
		this.y += y;
		this.intentPosition = null;
	}

	updateIntentPosition(direction: Direction) {
		const { x, y } = directionUpdateMap[direction];

		this.intentPosition = {
			x: this.x + x,
			y: this.y + y,
		};
	}

	abstract renderComponent(): ReactNode;
}
