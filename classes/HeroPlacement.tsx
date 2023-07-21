import { PersonPlacement } from '@/classes/PersonPlacement';
import { CELL_SIZE } from '@/utils/consts';

export class HeroPlacement extends PersonPlacement {
	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0) return;

		// Start the move
		this.movingPixelsRemaining = CELL_SIZE;
		this.movingPixelDirection = direction;
	}
}
