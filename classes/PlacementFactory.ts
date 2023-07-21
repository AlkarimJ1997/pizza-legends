import { PersonPlacement } from '@/classes/PersonPlacement';
import { HeroPlacement } from '@/classes/HeroPlacement';
import { PLACEMENT_TYPES } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';

class PlacementFactory {
	createPlacement(config: PlacementConfig, overworld: OverworldState) {
		const instance = this.getInstance(config, overworld);

		// Make ID here...

		return instance;
	}

	getInstance(config: PlacementConfig, overworld: OverworldState) {
		switch (config.type) {
			case PLACEMENT_TYPES.HERO:
				return new HeroPlacement(config, overworld);
			default:
				return new PersonPlacement(config, overworld);
		}
	}
}

export const placementFactory = new PlacementFactory();