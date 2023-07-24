import { CELL_SIZE, directionUpdateMap } from '@/utils/consts';
import { PersonPlacement } from '@/classes/PersonPlacement';

export class HeroPlacement extends PersonPlacement {
	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0) return;

		// Make sure the next space is available
		const canMove = this.canMoveToNextDestination(direction);
		if (!canMove) return;

		// Start the move
		this.movingPixelDirection = direction;
		this.movingPixelsRemaining = CELL_SIZE;
	}

	canMoveToNextDestination(direction: Direction) {
		// Is the next space in bounds?
		const { x, y } = directionUpdateMap[direction];
		const isOutOfBounds = this.overworld.isPositionOutOfBounds({
			x: this.x + x,
			y: this.y + y,
		});

		if (isOutOfBounds) return false;

		// TODO: Is there an NPC or other obstacle in the way?

		return true;
	}
}
