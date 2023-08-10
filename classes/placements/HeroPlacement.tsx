import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import { EVENTS } from '@/utils/consts';
import Sprite from '@/components/Sprite';

export class HeroPlacement extends PersonPlacement {
	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0 || this.overworld.isCutscenePlaying) {
			return;
		}

		// Start the walk behavior
		this.startBehavior({ type: EVENTS.WALK, direction });
		this.updateSprite();
	}

	renderComponent() {
		return <Sprite skinSrc={this.skin} frameCoord={this.frame} />;
	}
}
