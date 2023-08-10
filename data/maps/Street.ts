import {
	DIRECTIONS,
	EVENTS,
	MAPS,
	PLACEMENT_TYPES,
	SKINS,
} from '@/utils/consts';
import { asGridCoord } from '@/utils/helpers';

const OVERWORLD_STATE: OverworldConfig = {
	map: MAPS.Street,
	placements: [
		{ id: 'hero', x: 30, y: 10, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
	],
	cutsceneSpaces: {
		[asGridCoord(29, 8)]: [
			{
				events: [
					{
						type: EVENTS.MAP_CHANGE,
						map: 'Kitchen',
						x: 5,
						y: 9,
						direction: DIRECTIONS.UP,
					},
				],
			},
		],
	},
};

export default OVERWORLD_STATE;
