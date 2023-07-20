import { Placement } from '@/classes/Placement';
import { CELL_SIZE, directionUpdateMap } from '@/utils/consts';
import Sprite from '@/components/Sprite';

export class PersonPlacement extends Placement {
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

	renderComponent() {
		return <Sprite skinSrc={this.skin} direction={this.direction} />;
	}
}
