import { Placement } from '@/classes/Placement';
import type { OverworldState } from '@/classes/OverworldState';
import Sprite from '@/components/Sprite';
import { DIRECTIONS, directionUpdateMap } from '@/utils/consts';

export class PersonPlacement extends Placement {
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
