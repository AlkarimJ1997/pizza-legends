import { CELL_SIZE, DIRECTIONS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import type { PersonPlacement } from '@/classes/placements/PersonPlacement';

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
	cameraPerson: PersonPlacement;
	cameraX: number;
	cameraY: number;
	transformOffset: number;

	constructor(overworld: OverworldState, cameraPerson: PersonPlacement) {
		this.overworld = overworld;
		this.cameraPerson = cameraPerson;

		const [personX, personY] = this.targetCoords;

		this.cameraX = personX;
		this.cameraY = personY;
		this.transformOffset = -5.5 * CELL_SIZE;
	}

	get targetCoords() {
		return this.cameraPerson?.displayXY() ?? [];
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

	getNewCameraPosition() {
		const [personX, personY] = this.targetCoords;

		if (Camera.USE_SMOOTH_CAMERA) {
			const [newX, newY] = this.incorporateLookAhead(personX, personY);

			this.cameraX = Camera.lerp(this.cameraX, newX, Camera.SPEED);
			this.cameraY = Camera.lerp(this.cameraY, newY, Camera.SPEED);
			return;
		}

		this.cameraX = personX;
		this.cameraY = personY;
	}

	incorporateLookAhead(personX: number, personY: number) {
		let targetX = personX;
		let targetY = personY;

		if (this.cameraPerson.movingPixelsRemaining > 0) {
			switch (this.cameraPerson.movingPixelDirection) {
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

	centerOnHero() {
		const [personX, personY] = this.targetCoords;

		this.cameraX = personX;
		this.cameraY = personY;
	}

	tick() {
		this.getNewCameraPosition();
	}
}
