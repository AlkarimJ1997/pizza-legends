import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import { BEHAVIOR_TYPES } from '@/utils/consts';
import Person from '@/components/Person';

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

	renderComponent() {
		return <Person skinSrc={this.skin} frameCoord={this.frame} />;
	}
}
