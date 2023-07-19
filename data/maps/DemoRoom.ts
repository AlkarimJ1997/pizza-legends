import { MAPS, SKINS, DIRECTIONS } from '@/utils/consts';

const OVERWORLD_STATE = {
	map: MAPS.DemoRoom,
	placements: [
		{ id: 0, x: 5, y: 6, skin: SKINS.HERO, direction: DIRECTIONS.DOWN },
		{ id: 1, x: 7, y: 8, skin: SKINS.NPC1, direction: DIRECTIONS.DOWN },
	],
};

export default OVERWORLD_STATE;
