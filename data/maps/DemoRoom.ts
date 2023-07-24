import { MAPS, SKINS, PLACEMENT_TYPES, DIRECTIONS } from '@/utils/consts';

const OVERWORLD_STATE: Overworld = {
	map: MAPS.DemoRoom,
	placements: [
		{
			id: 0,
			x: 5,
			y: 6,
			skin: SKINS.HERO,
			type: PLACEMENT_TYPES.HERO,
			direction: DIRECTIONS.RIGHT,
		},
		{ id: 1, x: 7, y: 8, skin: SKINS.NPC1 },
	],
};

export default OVERWORLD_STATE;
