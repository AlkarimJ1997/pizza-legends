import { ANIMATIONS, BATTLE_EVENTS, EVENTS } from '@/utils/consts';

export const tackle = {
	name: 'Tackle',
	success: [
		{ type: EVENTS.MESSAGE, text: '{CASTER} used {MOVE}!' },
		{ type: BATTLE_EVENTS.ANIMATION, animation: ANIMATIONS.SPIN },
		{ type: BATTLE_EVENTS.STATE_CHANGE, damage: 10 },
	],
};
