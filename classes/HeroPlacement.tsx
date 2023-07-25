import { BEHAVIOR_TYPES } from '@/utils/consts';
import { PersonPlacement } from '@/classes/PersonPlacement';

export class HeroPlacement extends PersonPlacement {
	controllerMoveRequested(direction: Direction) {
		if (this.movingPixelsRemaining > 0 || this.overworld.isCutscenePlaying) {
			return;
		}

		// Start the walk behavior
		this.startBehavior({
			type: BEHAVIOR_TYPES.WALK,
			direction,
		});
		this.updateSprite();
	}
}
