import { Placement } from '@/classes/Placement';
import { CELL_SIZE, directionUpdateMap } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import Sprite from '@/components/Sprite';
import { TILES } from '@/utils/tiles';

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
		this.animationFrameLimit = 16;
		this.animationFrameProgress = this.animationFrameLimit;
	}

	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0) return;

		// Start the move
		this.movingPixelsRemaining = CELL_SIZE;
		this.movingPixelDirection = direction;
		this.updateSprite();
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
	}

	onDoneMoving() {
		const { x, y } = directionUpdateMap[this.movingPixelDirection];

		this.x += x;
		this.y += y;
    this.updateSprite();
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

	getFrame() {
		const frameLength = this.animations[this.currentAnimation].length;

		if (this.currentAnimationFrame >= frameLength) {
			this.currentAnimationFrame = 0;
		}

		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	renderComponent() {
		return <Sprite skinSrc={this.skin} frameCoord={this.getFrame()} />;
	}
}
