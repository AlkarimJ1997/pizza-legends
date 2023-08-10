import { Placement } from '@/classes/placements/Placement';
import {
	EVENTS,
	CELL_SIZE,
	CUSTOM_EVENTS,
	directionUpdateMap,
} from '@/utils/consts';
import { TILES } from '@/utils/tiles';
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

		this.animations = {
			'idle-up': TILES.IDLE_UP,
			'idle-down': TILES.IDLE_DOWN,
			'idle-left': TILES.IDLE_LEFT,
			'idle-right': TILES.IDLE_RIGHT,
			'walk-up': TILES.WALK_UP,
			'walk-down': TILES.WALK_DOWN,
			'walk-left': TILES.WALK_LEFT,
			'walk-right': TILES.WALK_RIGHT,
		};

		// Behavior
		this.behaviorLoop = config.behaviorLoop ?? [];
		this.behaviorLoopIndex = 0;
	}

	startBehavior(behavior: WalkEvent | StandEvent) {
		this.movingPixelDirection = behavior.direction;

		if (behavior.type === EVENTS.WALK) {
			if (!this.canMoveToNextDestination(behavior.direction)) {
				behavior.retry && setTimeout(() => this.startBehavior(behavior), 10);
				this.updateSprite();
				return;
			}

			this.movingPixelsRemaining = CELL_SIZE;
			this.updateIntentPosition(behavior.direction);
			this.updateSprite();
			return;
		}

		if (behavior.type === EVENTS.STAND) {
			setTimeout(() => {
				emitEvent(CUSTOM_EVENTS.STAND, { whoId: this.id! });
			}, behavior.time);
			this.updateSprite();
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
		this.tickAnimationProgress();
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

	tickAnimationProgress() {
		if (this.animationFrameProgress > 0) {
			this.animationFrameProgress--;
			return;
		}

		this.animationFrameProgress = this.animationFrameLimit;
		this.currentAnimationFrame++;

		if (!this.frame) this.currentAnimationFrame = 0;
	}

	onDoneMoving() {
		const { x, y } = directionUpdateMap[this.movingPixelDirection];

		this.x += x;
		this.y += y;
		this.intentPosition = null;

		if (!this.overworld.directionControls?.direction) {
			this.updateSprite();
		}
	}

	setAnimation(key: WalkAnimationName) {
		if (this.currentAnimation === key) return;

		this.currentAnimation = key;
		this.currentAnimationFrame = 0;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	updateSprite() {
		const dir = this.movingPixelDirection.toLowerCase();

		if (this.movingPixelsRemaining > 0) {
			this.setAnimation(`walk-${dir}` as WalkAnimationName);
			return;
		}

		this.setAnimation(`idle-${dir}` as WalkAnimationName);
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
