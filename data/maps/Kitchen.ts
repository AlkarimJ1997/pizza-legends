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
		{ id: 'hero', x: 10, y: 4, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		{
			id: 'kitchenNpcA',
			x: 9,
			y: 4,
			skin: SKINS.NPC3,
			direction: DIRECTIONS.UP,
			type: PLACEMENT_TYPES.NPC,
			talking: [
				{
					events: [
						{
							type: EVENTS.MESSAGE,
							text: "** They don't want to talk to you **",
						},
					],
				},
			],
		},
		{
			id: 'kitchenNpcB',
			x: 3,
			y: 5,
			skin: SKINS.NPC3,
			type: PLACEMENT_TYPES.NPC,
			behaviorLoop: [
				{ type: EVENTS.WALK, direction: DIRECTIONS.RIGHT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.RIGHT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.DOWN },
				{ type: EVENTS.WALK, direction: DIRECTIONS.DOWN },
				{ type: EVENTS.WALK, direction: DIRECTIONS.LEFT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.LEFT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.UP },
				{ type: EVENTS.WALK, direction: DIRECTIONS.UP },
				{ type: EVENTS.STAND, direction: DIRECTIONS.UP, time: 500 },
				{ type: EVENTS.STAND, direction: DIRECTIONS.LEFT, time: 500 },
			],
			talking: [
				{
					events: [
						{
							type: EVENTS.MESSAGE,
							text: 'People take their jobs here very seriously.',
							faceHero: 'kitchenNpcB',
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
						map: 'DiningRoom',
						x: 7,
						y: 2,
						direction: DIRECTIONS.DOWN,
					},
				],
			},
		],
		[asGridCoord(10, 5)]: [],
	},
};

export default OVERWORLD_STATE;
