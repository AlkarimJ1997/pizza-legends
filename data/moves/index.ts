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
