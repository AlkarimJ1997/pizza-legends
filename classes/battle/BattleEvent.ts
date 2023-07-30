import { BATTLE_EVENTS, EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import { SubmissionMenu } from '@/classes/battle/SubmissionMenu';
import type { Battle } from '@/classes/battle/Battle';
import { wait } from '@/utils/helpers';
import Animations from '@/data/AnimationMap';

type ResolveFn = (value: void | Submission) => void;

export class BattleEvent {
	event: BattleAction;
	battle: Battle;

	constructor(event: BattleAction, battle: Battle) {
		this.event = event;
		this.battle = battle;
	}

	textMessage(resolve: ResolveFn) {
		const { text, caster, submission } = this.event as BattleMessageEvent;

		const updatedText = text
			.replace('{CASTER}', caster?.config.name ?? '')
			.replace('{TARGET}', submission?.target.config.name ?? '')
			.replace('{MOVE}', submission?.move.name.toUpperCase() ?? '');

		this.battle.overworld.message = new Message({
			text: updatedText,
			onComplete: () => resolve(),
			overworld: this.battle.overworld,
		});
	}

	async stateChange(resolve: ResolveFn) {
		const event = this.event as StateChangeEvent;

		if (!event.submission) return resolve();

		if (event.damage) {
			// Modify the target's health
			event.submission.target.update({
				hp: event.submission.target.config.hp - event.damage,
			});

			// Start blinking
			event.submission.target.isBlinking = true;
		}

		if (event.recovery) {
			const who = event.onCaster ? event.caster : event.submission.target;

			who?.update({
				hp: Math.min(who.config.hp + event.recovery, who.config.maxHp),
			});
		}

		// Stop blinking
		await wait(600);
		event.submission.target.isBlinking = false;

		// Resolve
		resolve();
	}

	submissionMenu(resolve: ResolveFn) {
		const { caster, target } = this.event as SubmissionMenuEvent;

		const menu = new SubmissionMenu({
			caster,
			target,
			onComplete: (submission: Submission) => {
				resolve(submission);
			},
		});

		menu.init();
	}

	animation(resolve: ResolveFn) {
		const { animation } = this.event as BattleAnimationEvent;

		const fn = Animations[animation];
		fn(this.event, resolve);
	}

	init(resolve: ResolveFn) {
		switch (this.event.type) {
			case EVENTS.MESSAGE:
				return this.textMessage(resolve);
			case BATTLE_EVENTS.SUBMISSION_MENU:
				return this.submissionMenu(resolve);
			case BATTLE_EVENTS.STATE_CHANGE:
				return this.stateChange(resolve);
			case BATTLE_EVENTS.ANIMATION:
				return this.animation(resolve);
			default:
				return resolve();
		}
	}
}
