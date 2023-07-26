import { HeroPlacement } from '@/classes/placements/HeroPlacement';
import { PLACEMENT_TYPES } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import { NPCPlacement } from '@/classes/placements/NPCPlacement';

class PlacementFactory {
	createPlacement(config: PlacementConfig, overworld: OverworldState) {
		const instance = this.getInstance(config, overworld);
		instance.id = 'id' in config ? config.id : null;

		return instance;
	}

	getInstance(config: PlacementConfig, overworld: OverworldState) {
		switch (config.type) {
			case PLACEMENT_TYPES.HERO:
				return new HeroPlacement(config as PersonConfig, overworld);
			case PLACEMENT_TYPES.NPC:
				return new NPCPlacement(config as PersonConfig, overworld);
			default:
				throw new Error(`Unknown placement type: ${config.type}`);
		}
	}
}

export const placementFactory = new PlacementFactory();
