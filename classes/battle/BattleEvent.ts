import { BATTLE_EVENTS, EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import { SubmissionMenu } from '@/classes/battle/SubmissionMenu';
import type { Battle } from '@/classes/battle/Battle';
import { wait } from '@/utils/helpers';

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
		const { damage, caster, submission } = this.event as StateChangeEvent;

		if (!submission) return resolve();

		if (damage) {
			// Modify the target's health
			submission.target.update({
				hp: submission.target.config.hp - damage,
			});

			// Start blinking
			submission.target.isBlinking = true;
		}

		// Wait a little bit for the animation to play

		// Stop blinking
		await wait(600);
		submission.target.isBlinking = false;

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

	init(resolve: ResolveFn) {
		switch (this.event.type) {
			case EVENTS.MESSAGE:
				return this.textMessage(resolve);
			case BATTLE_EVENTS.SUBMISSION_MENU:
				return this.submissionMenu(resolve);
			case BATTLE_EVENTS.STATE_CHANGE:
				return this.stateChange(resolve);
			default:
				return resolve();
		}
	}
}
