import { HeroPlacement } from '@/classes/HeroPlacement';
import { NPCPlacement } from '@/classes/NPCPlacement';
import { PLACEMENT_TYPES } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';

class PlacementFactory {
	createPlacement(
		id: string,
		config: PlacementConfig,
		overworld: OverworldState
	) {
		const instance = this.getInstance(config, overworld);
		instance.id = id;

		return instance;
	}

	getInstance(config: PlacementConfig, overworld: OverworldState) {
		switch (config.type) {
			case PLACEMENT_TYPES.HERO:
				return new HeroPlacement(config, overworld);
			case PLACEMENT_TYPES.NPC:
				return new NPCPlacement(config, overworld);
			default:
				throw new Error(`Unknown placement type: ${config.type}`);
		}
	}
}

export const placementFactory = new PlacementFactory();
