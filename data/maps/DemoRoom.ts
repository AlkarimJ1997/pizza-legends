import {
	MAPS,
	SKINS,
	PLACEMENT_TYPES,
	BEHAVIOR_TYPES,
	DIRECTIONS,
} from '@/utils/consts';
import { asGridCoord } from '@/utils/helpers';

const OVERWORLD_STATE: OverworldConfig = {
	map: MAPS.DemoRoom,
	placements: {
		hero: { x: 5, y: 5, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		npcA: {
			x: 7,
			y: 8,
			skin: SKINS.NPC1,
			type: PLACEMENT_TYPES.NPC,
			behaviorLoop: [
				{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.LEFT, time: 800 },
				{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.UP, time: 800 },
				{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.RIGHT, time: 1200 },
				{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.UP, time: 300 },
			],
		},
		npcB: {
			x: 3,
			y: 6,
			skin: SKINS.NPC2,
			type: PLACEMENT_TYPES.NPC,
			behaviorLoop: [
				{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.LEFT },
				{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.UP, time: 800 },
				{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.UP },
				{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.RIGHT },
				{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.DOWN },
			],
		},
	},
	walls: {
		[asGridCoord(7, 5)]: true,
		[asGridCoord(8, 5)]: true,
		[asGridCoord(7, 6)]: true,
		[asGridCoord(8, 6)]: true,
	},
};

export default OVERWORLD_STATE;
