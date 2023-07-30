import {
	ANIMATIONS,
	BATTLE_EVENTS,
	EVENTS,
	MOVE_TYPES,
	STATUSES,
} from '@/utils/consts';

export const tackle: MoveConfig = {
	name: 'Tackle',
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {MOVE}!' },
		{ type: BATTLE_EVENTS.ANIMATION, animation: ANIMATIONS.SPIN },
		{ type: BATTLE_EVENTS.STATE_CHANGE, damage: 10 },
	],
};

export const tomatoSqueeze: MoveConfig = {
	name: 'Tomato Squeeze',
	targetType: MOVE_TYPES.FRIENDLY,
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {MOVE}!' },
		{
			type: BATTLE_EVENTS.STATE_CHANGE,
			status: {
				type: STATUSES.SAUCY,
				expiresIn: 3,
			},
		},
	],
};

export const oliveOil: MoveConfig = {
	name: 'Olive Oil',
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {MOVE}!' },
		{
			type: BATTLE_EVENTS.ANIMATION,
			animation: ANIMATIONS.GLOB,
			color: '#2A2A2A',
		},
		{
			type: BATTLE_EVENTS.STATE_CHANGE,
			status: {
				type: STATUSES.CLUMSY,
				expiresIn: 3,
			},
		},
		{ type: EVENTS.MESSAGE, text: '{TARGET} is slipping all around!' },
	],
};
