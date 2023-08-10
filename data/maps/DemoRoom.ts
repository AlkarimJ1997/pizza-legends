import {
	MAPS,
	SKINS,
	PLACEMENT_TYPES,
	EVENTS,
	DIRECTIONS,
	STORY_FLAGS,
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
				{ type: EVENTS.STAND, direction: DIRECTIONS.LEFT, time: 800 },
				{ type: EVENTS.STAND, direction: DIRECTIONS.UP, time: 800 },
				{ type: EVENTS.STAND, direction: DIRECTIONS.RIGHT, time: 1200 },
				{ type: EVENTS.STAND, direction: DIRECTIONS.UP, time: 300 },
			],
			talking: [
				{
					required: [STORY_FLAGS.TALKED_TO_ERIO],
					events: [
						{
							type: EVENTS.MESSAGE,
							text: "Isn't Erio the coolest?",
							faceHero: 'npcA',
						},
					],
				},
				{
					events: [
						{
							type: EVENTS.MESSAGE,
							text: "I'm going to crush you!",
							faceHero: 'npcA',
						},
						{ type: EVENTS.BATTLE, trainerId: 'beth' },
						{ type: EVENTS.STORY_FLAG, flag: 'DEFEATED_BETH' },
						{ type: EVENTS.MESSAGE, text: 'You crushed me like weak pepper!' },
					],
				},
			],
		},
		{
			id: 'npcB',
			x: 8,
			y: 4,
			skin: SKINS.ERIO,
			type: PLACEMENT_TYPES.NPC,
			talking: [
				{
					events: [
						{ type: EVENTS.MESSAGE, text: 'Bahaha!', faceHero: 'npcB' },
						{ type: EVENTS.STORY_FLAG, flag: 'TALKED_TO_ERIO' },
						// { type: EVENTS.BATTLE, trainerId: 'erio' },
					],
				},
			],
		},
		{
			id: 'npcC',
			x: 3,
			y: 6,
			skin: SKINS.NPC3,
			type: PLACEMENT_TYPES.NPC,
			behaviorLoop: [
				{ type: EVENTS.STAND, direction: DIRECTIONS.DOWN, time: 800 },
				{ type: EVENTS.WALK, direction: DIRECTIONS.LEFT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.UP },
				{ type: EVENTS.WALK, direction: DIRECTIONS.RIGHT },
				{ type: EVENTS.WALK, direction: DIRECTIONS.DOWN },
			],
		},
	],
	walls: ['7x5', '8x5', '7x6', '8x6'],
	cutsceneSpaces: {
		[asGridCoord(7, 3)]: [
			{
				events: [
					{ type: EVENTS.WALK, direction: DIRECTIONS.LEFT, who: 'npcB' },
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.UP,
						time: 300,
						who: 'npcB',
					},
					{ type: EVENTS.MESSAGE, text: "You can't be in there!" },
					{ type: EVENTS.WALK, direction: DIRECTIONS.RIGHT, who: 'npcB' },
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.DOWN,
						time: 100,
						who: 'npcB',
					},
					{ type: EVENTS.WALK, direction: DIRECTIONS.DOWN, who: 'hero' },
					{ type: EVENTS.WALK, direction: DIRECTIONS.LEFT, who: 'hero' },
				],
			},
		],
		[asGridCoord(5, 9)]: [
			{
				events: [{ type: EVENTS.MAP_CHANGE, map: 'Kitchen' }],
			},
		],
	},
};

export default OVERWORLD_STATE;
