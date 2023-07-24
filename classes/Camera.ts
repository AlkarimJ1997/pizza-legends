import { CELL_SIZE, DIRECTIONS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import type { HeroPlacement } from '@/classes/HeroPlacement';

export class Camera {
	// Default
	static readonly SPEED = 0.02;
	static readonly LOOK_AHEAD = 3;
	static readonly USE_SMOOTH_CAMERA = true;

	// Zen Mode
	// static readonly SPEED = 0.01;
	// static readonly LOOK_AHEAD = 4;
	// static readonly USE_SMOOTH_CAMERA = true;

	overworld: OverworldState;
	cameraX: number;
	cameraY: number;
	transformOffset: number;

	constructor(overworld: OverworldState) {
		this.overworld = overworld;

		const [heroX, heroY] = this.overworld.heroRef?.displayXY() ?? [];

		if (!heroX || !heroY) throw new Error('Hero not found');

		this.cameraX = heroX;
		this.cameraY = heroY;
		this.transformOffset = -5.5 * CELL_SIZE;
	}

	get transformX() {
		return -this.cameraX - this.transformOffset + 'px';
	}

	get transformY() {
		return -this.cameraY - this.transformOffset + 'px';
	}

	static lerp(currentValue: number, targetValue: number, time: number) {
		return currentValue * (1 - time) + targetValue * time;
	}

	tick() {
		this.getNewCameraPosition();
	}

	getNewCameraPosition() {
		const hero = this.overworld.heroRef;

		if (!hero) throw new Error('Hero not found');

		const [heroX, heroY] = hero.displayXY();

		if (Camera.USE_SMOOTH_CAMERA) {
			const [targetX, targetY] = this.incorporateLookAhead(hero, heroX, heroY);

			this.cameraX = Camera.lerp(this.cameraX, targetX, Camera.SPEED);
			this.cameraY = Camera.lerp(this.cameraY, targetY, Camera.SPEED);
			return;
		}

		this.cameraX = heroX;
		this.cameraY = heroY;
	}

	incorporateLookAhead(hero: HeroPlacement, heroX: number, heroY: number) {
		let targetX = heroX;
		let targetY = heroY;

		if (hero.movingPixelsRemaining > 0) {
			switch (hero.movingPixelDirection) {
				case DIRECTIONS.UP:
					targetY -= Camera.LOOK_AHEAD * CELL_SIZE;
					break;
				case DIRECTIONS.DOWN:
					targetY += Camera.LOOK_AHEAD * CELL_SIZE;
					break;
				case DIRECTIONS.LEFT:
					targetX -= Camera.LOOK_AHEAD * CELL_SIZE;
					break;
				default:
					targetX += Camera.LOOK_AHEAD * CELL_SIZE;
			}
		}

		return [targetX, targetY];
	}
}
