import { Placement } from '@/classes/Placement';
import {
	BEHAVIOR_TYPES,
	CELL_SIZE,
	CUSTOM_EVENTS,
	directionUpdateMap,
} from '@/utils/consts';
import { TILES } from '@/utils/tiles';
import type { OverworldState } from '@/classes/OverworldState';
import Sprite from '@/components/Sprite';
import { emitEvent } from '@/utils/helpers';

export class PersonPlacement extends Placement {
	animations: AnimationMap;
	currentAnimation: AnimationName;
	currentAnimationFrame: number;
	animationFrameLimit: number;
	animationFrameProgress: number;

	constructor(config: PlacementConfig, overworld: OverworldState) {
		super(config, overworld);

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
		this.currentAnimation = 'idle-down';
		this.currentAnimationFrame = 0;
		this.animationFrameLimit = 8;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	get frame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	startBehavior(behavior: BehaviorEvent) {
		this.movingPixelDirection = behavior.direction;

		if (behavior.type === BEHAVIOR_TYPES.WALK) {
			if (!this.canMoveToNextDestination(behavior.direction)) {
				behavior.retry && setTimeout(() => this.startBehavior(behavior), 10);
				this.updateSprite();
				return;
			}

			this.overworld.moveWall(this.x, this.y, behavior.direction);
			this.movingPixelsRemaining = CELL_SIZE;
			this.updateSprite();
			return;
		}

		if (behavior.type === BEHAVIOR_TYPES.STAND) {
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
		const isSolid = this.overworld.isPositionSolid(nextPosition);
		if (isSolid) return false;

		// Is the next space occupied? (by another person or object)
		const isOccupied = this.overworld.isPositionOccupied(nextPosition);
		if (isOccupied) return false;

		return true;
	}

	tick() {
		this.tickMovingPixelProgress();
		this.tickAnimationProgress();
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

		if (!this.overworld.directionControls.direction) {
			this.updateSprite();
		}
	}

	setAnimation(key: AnimationName) {
		if (this.currentAnimation === key) return;

		this.currentAnimation = key;
		this.currentAnimationFrame = 0;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	updateSprite() {
		const dir = this.movingPixelDirection.toLowerCase();

		if (this.movingPixelsRemaining > 0) {
			this.setAnimation(`walk-${dir}` as AnimationName);
			return;
		}

		this.setAnimation(`idle-${dir}` as AnimationName);
	}

	renderComponent() {
		return <Sprite skinSrc={this.skin} frameCoord={this.frame} />;
	}
}
