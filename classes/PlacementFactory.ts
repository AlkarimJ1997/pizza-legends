import { HeroPlacement } from '@/classes/placements/HeroPlacement';
import { NPCPlacement } from '@/classes/placements/NPCPlacement';
import { WallPlacement } from '@/classes/placements/WallPlacement';
import { PLACEMENT_TYPES } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import { v4 as uuidv4 } from 'uuid';

class PlacementFactory {
	createPlacement(config: PlacementConfig, overworld: OverworldState) {
		const instance = this.getInstance(config, overworld);
		instance.id = 'id' in config ? config.id : uuidv4();

		return instance;
	}

	getInstance(config: PlacementConfig, overworld: OverworldState) {
		switch (config.type) {
			case PLACEMENT_TYPES.HERO:
				return new HeroPlacement(config as PersonConfig, overworld);
			case PLACEMENT_TYPES.NPC:
				return new NPCPlacement(config as PersonConfig, overworld);
			case PLACEMENT_TYPES.WALL:
				return new WallPlacement(config, overworld);
			default:
				throw new Error(`Unknown placement type: ${config}`);
		}
	}
}

export const placementFactory = new PlacementFactory();
