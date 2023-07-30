import { ANIMATIONS } from '@/utils/consts';
import { wait } from '@/utils/helpers';

export const spin = async (event: BattleAction, onComplete: () => void) => {
	if (!event.caster) return;

	event.caster.animation = ANIMATIONS.SPIN;

	// Timing tuning for HP and XP bars
	await wait(100);
	onComplete();

	// Wait for the animation to finish
	await wait(700);
	event.caster.animation = null;
};
