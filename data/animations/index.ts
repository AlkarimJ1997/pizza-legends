import { ANIMATIONS } from '@/utils/consts';
import { wait } from '@/utils/helpers';

export const spin = async (
	event: BattleAnimationEvent,
	onComplete: () => void
) => {
	if (!event.caster) return;

	event.caster.animateSpin = true;

	// Timing tuning for HP and XP bars
	await wait(100);
	onComplete();

	// Wait for the animation to finish
	await wait(700);
	event.caster.animateSpin = false;
};

export const glob = async (
	event: BattleAnimationEvent,
	onComplete: () => void
) => {
	if (!event.caster) return;

	// If the event was given a VALID color, use it
	if (event.color && event.color.match(/^#[0-9a-f]{6}$/i)) {
		document.documentElement.style.setProperty('--glob-clr', event.color);
	}

	event.caster.animateGlob = true;
	await wait(820);

	onComplete();
	await wait(180);

	event.caster.animateGlob = false;
	document.documentElement.style.setProperty(
		'--glob-clr',
		'var(--glob-clr-default)'
	);
};
