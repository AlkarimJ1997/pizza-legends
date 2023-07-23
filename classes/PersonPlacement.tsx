import { Placement } from '@/classes/Placement';
import { CELL_SIZE, directionUpdateMap } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import Sprite from '@/components/Sprite';

export class PersonPlacement extends Placement {
	animations: AnimationMap;
	currentAnimation: AnimationName;
	currentAnimationFrame: number;
	animationFrameLimit: number;
	animationFrameProgress: number;

	constructor(config: PlacementConfig, overworld: OverworldState) {
		super(config, overworld);

		this.animations = {
			'idle-up': [[0, 2]],
			'idle-down': [[0, 0]],
			'idle-left': [[0, 3]],
			'idle-right': [[0, 1]],
			'walk-up': [
				[1, 2],
				[0, 2],
				[3, 2],
				[0, 2],
			],
			'walk-down': [
				[1, 0],
				[0, 0],
				[3, 0],
				[0, 0],
			],
			'walk-left': [
				[1, 3],
				[0, 3],
				[3, 3],
				[0, 3],
			],
			'walk-right': [
				[1, 1],
				[0, 1],
				[3, 1],
				[0, 1],
			],
		};
		this.currentAnimation = 'walk-left';
		this.currentAnimationFrame = 0;
		this.animationFrameLimit = 16;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0) return;

		// Start the move
		this.movingPixelsRemaining = CELL_SIZE;
		this.movingPixelDirection = direction;
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
		}
	}

	tickAnimationProgress() {
		if (this.animationFrameProgress > 0) {
			this.animationFrameProgress--;
			return;
		}

		this.animationFrameProgress = this.animationFrameLimit;
		this.currentAnimationFrame++;

		if (!this.getFrame()) {
			this.currentAnimationFrame = 0;
		}
	}

	onDoneMoving() {
		const { x, y } = directionUpdateMap[this.movingPixelDirection];

		this.x += x;
		this.y += y;
	}

	setAnimation(key: AnimationName) {
		if (this.currentAnimation === key) return;

		this.currentAnimation = key;
		this.currentAnimationFrame = 0;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	getFrame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	renderComponent() {
		return <Sprite skinSrc={this.skin} frameCoord={this.getFrame()} />;
	}
}
