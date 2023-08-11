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
			skin: SKINS.NPC8,
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
		[asGridCoord(10, 5)]: [
			{
				disqualify: ['SEEN_INTRO'],
				events: [
					{ type: EVENTS.STORY_FLAG, flag: 'SEEN_INTRO' },
					{
						type: EVENTS.MESSAGE,
						text: '* You are chopping ingredients on your first day as a Pizza Chef at a famed establishment in town. *',
					},
					{ type: EVENTS.WALK, direction: DIRECTIONS.DOWN, who: 'kitchenNpcA' },
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.RIGHT,
						time: 200,
						who: 'kitchenNpcA',
					},
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.LEFT,
						time: 200,
						who: 'hero',
					},
					{ type: EVENTS.MESSAGE, text: 'Ahem. Is this your best work?' },
					{
						type: EVENTS.MESSAGE,
						text: 'These pepperonis are completely unstable! The pepper shapes are all wrong!',
					},
					{
						type: EVENTS.MESSAGE,
						text: "Don't even get me started on the mushrooms.",
					},
					{ type: EVENTS.MESSAGE, text: 'You will never make it in pizza!' },
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.RIGHT,
						time: 200,
						who: 'kitchenNpcA',
					},
					{ type: EVENTS.WALK, direction: DIRECTIONS.UP, who: 'kitchenNpcA' },
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.UP,
						time: 300,
						who: 'kitchenNpcA',
					},
					{
						type: EVENTS.STAND,
						direction: DIRECTIONS.DOWN,
						time: 400,
						who: 'hero',
					},
					{
						type: EVENTS.MESSAGE,
						text: '* The competition is fierce! You should spend some time leveling up your Pizza lineup and skills. *',
					},
					{
						type: EVENTS.MAP_CHANGE,
						map: 'Street',
						x: 5,
						y: 10,
						direction: DIRECTIONS.DOWN,
					},
				],
			},
		],
	},
	walls: [
		'2x3',
		'3x3',
		'5x3',
		'6x3',
		'7x3',
		'8x3',
		'11x3',
		'11x4',
		'12x4',
		'1x4',
		'1x5',
		'1x7',
		'1x8',
		'2x8',
		'6x6',
		'7x6',
		'9x6',
		'10x6',
		'9x8',
		'10x8',
		'3x9',
		'4x9',
		'6x9',
		'7x9',
		'8x9',
		'11x9',
		'12x9',
		'0x7',
		'5x10',
		'4x2',
		'9x3',
		'10x3',
		'13x5',
		'13x6',
		'13x7',
		'13x8',
	],
};

export default OVERWORLD_STATE;
