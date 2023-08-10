import {
	DIRECTIONS,
	EVENTS,
	MAPS,
	PLACEMENT_TYPES,
	SKINS,
} from '@/utils/consts';
import { asGridCoord } from '@/utils/helpers';

const OVERWORLD_STATE: OverworldConfig = {
	map: MAPS.Kitchen,
	placements: [
		{ id: 'hero', x: 5, y: 4, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		{
			id: 'npcB',
			x: 10,
			y: 7,
			skin: SKINS.NPC3,
			type: PLACEMENT_TYPES.NPC,
			talking: [
				{
					events: [
						{
							type: EVENTS.MESSAGE,
							text: 'You made it!',
							faceHero: 'npcB',
						},
					],
				},
			],
		},
	],
	cutsceneSpaces: {
		[asGridCoord(5, 9)]: [
			{
				events: [
					{
						type: EVENTS.MAP_CHANGE,
						map: 'Street',
						x: 29,
						y: 8,
						direction: DIRECTIONS.DOWN,
					},
				],
			},
		],
	},
};

export default OVERWORLD_STATE;
