import { MAPS, SKINS, PLACEMENT_TYPES } from '@/utils/consts';

const OVERWORLD_STATE: OverworldConfig = {
	map: MAPS.DemoRoom,
	placements: {
		hero: { x: 5, y: 5, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		npcA: { x: 7, y: 8, skin: SKINS.NPC1 },
    npcB: { x: 3, y: 6, skin: SKINS.NPC2 },
	},
};

export default OVERWORLD_STATE;
