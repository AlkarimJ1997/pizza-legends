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
			'idle-down': [[0, 0]],
			'walk-down': [
				[1, 0],
				[0, 0],
				[3, 0],
				[0, 0],
			],
		};
		this.currentAnimation = 'walk-down';
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
	}

	tickMovingPixelProgress() {
		if (this.movingPixelsRemaining === 0) return;

		this.movingPixelsRemaining -= this.travelPixelsPerFrame;

		if (this.movingPixelsRemaining <= 0) {
			this.movingPixelsRemaining = 0;
			this.onDoneMoving();
		}
	}

	onDoneMoving() {
		const { x, y } = directionUpdateMap[this.movingPixelDirection];

		this.x += x;
		this.y += y;
	}

	getFrame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	renderComponent() {
		return (
			<Sprite
				skinSrc={this.skin}
				frameCoord={this.getFrame()}
				direction={this.direction}
			/>
		);
	}
}
