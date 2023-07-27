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
	placements: [
		{ id: 'hero', x: 5, y: 5, skin: SKINS.HERO, type: PLACEMENT_TYPES.HERO },
		{
			id: 'npcA',
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
			talking: [
				{
					events: [
						{
							type: BEHAVIOR_TYPES.MESSAGE,
							text: "I'm busy...",
							faceHero: 'npcA',
						},
						{ type: BEHAVIOR_TYPES.MESSAGE, text: 'Go away!' },
						{
							type: BEHAVIOR_TYPES.WALK,
							direction: DIRECTIONS.UP,
							who: 'hero',
						},
					],
				},
			],
		},
		{
			id: 'npcB',
			x: 8,
			y: 4,
			skin: SKINS.NPC2,
			type: PLACEMENT_TYPES.NPC,
			// behaviorLoop: [
			// 	{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.LEFT },
			// 	{ type: BEHAVIOR_TYPES.STAND, direction: DIRECTIONS.UP, time: 800 },
			// 	{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.UP },
			// 	{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.RIGHT },
			// 	{ type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.DOWN },
			// ],
		},
	],
	walls: ['7x5', '8x5', '7x6', '8x6'],
	cutsceneSpaces: {
		[asGridCoord(7, 3)]: [
			{
				events: [
					{
						type: BEHAVIOR_TYPES.WALK,
						direction: DIRECTIONS.LEFT,
						who: 'npcB',
					},
					{
						type: BEHAVIOR_TYPES.STAND,
						direction: DIRECTIONS.UP,
						time: 300,
						who: 'npcB',
					},
					{ type: BEHAVIOR_TYPES.MESSAGE, text: "You can't be in there!" },
					{
						type: BEHAVIOR_TYPES.WALK,
						direction: DIRECTIONS.RIGHT,
						who: 'npcB',
					},
					{
						type: BEHAVIOR_TYPES.STAND,
						direction: DIRECTIONS.DOWN,
						time: 100,
						who: 'npcB',
					},
					{
						type: BEHAVIOR_TYPES.WALK,
						direction: DIRECTIONS.DOWN,
						who: 'hero',
					},
					{
						type: BEHAVIOR_TYPES.WALK,
						direction: DIRECTIONS.LEFT,
						who: 'hero',
					},
				],
			},
		],
		[asGridCoord(5, 9)]: [
			{
				events: [{ type: BEHAVIOR_TYPES.MAP_CHANGE, map: 'Kitchen' }],
			},
		],
	},
};

export default OVERWORLD_STATE;
