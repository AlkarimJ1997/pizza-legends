import {
	ANIMATIONS,
	BATTLE_EVENTS,
	EVENTS,
	ACTION_TYPES,
	STATUSES,
} from '@/utils/consts';

export const tackle: ActionConfig = {
	name: 'Tackle',
	description: 'Hurl yourself at your opponent!',
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {ACTION}!' },
		{ type: BATTLE_EVENTS.ANIMATION, animation: ANIMATIONS.SPIN },
		{ type: BATTLE_EVENTS.STATE_CHANGE, damage: 10 },
	],
};

export const tomatoSqueeze: ActionConfig = {
	name: 'Tomato Squeeze',
	description: 'Refresh your pizza with a squeeze of tomato juice',
	targetType: ACTION_TYPES.FRIENDLY,
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {ACTION}!' },
		{
			type: BATTLE_EVENTS.STATE_CHANGE,
			status: {
				type: STATUSES.SAUCY,
				expiresIn: 3,
			},
		},
	],
};

export const oliveOil: ActionConfig = {
	name: 'Olive Oil',
	description: "Throw some olive oil in your opponent's eyes!",
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {ACTION}!' },
		{ type: BATTLE_EVENTS.ANIMATION, animation: ANIMATIONS.GLOB },
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

export const item_heatingLamp: ActionConfig = {
	name: 'Heating Lamp',
	description: 'Warm up your pizza on the spot!',
	targetType: ACTION_TYPES.FRIENDLY,
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used a {ACTION}!' },
		{ type: BATTLE_EVENTS.STATE_CHANGE, status: null },
		{ type: EVENTS.MESSAGE, text: '{TARGET} is nice and toasty!' },
	],
};
