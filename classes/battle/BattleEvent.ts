import { BATTLE_EVENTS, EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import { SubmissionMenu } from '@/classes/battle/SubmissionMenu';
import type { Battle } from '@/classes/battle/Battle';

export class BattleEvent {
	event: BattleAction;
	battle: Battle;

	constructor(event: BattleAction, battle: Battle) {
		this.event = event;
		this.battle = battle;
	}

	textMessage(resolve: any) {
		const { text } = this.event as TextMessageEvent;

		this.battle.overworld.message = new Message({
			text,
			onComplete: () => resolve(),
			overworld: this.battle.overworld,
		});
	}

	submissionMenu(resolve: any) {
		const { caster, target } = this.event as SubmissionEvent;

		const menu = new SubmissionMenu({
			caster,
			target,
			onComplete: submission => {
				resolve(submission);
			},
		});

		menu.init();
	}

	init(resolve: any) {
		switch (this.event.type) {
			case EVENTS.MESSAGE:
				return this.textMessage(resolve);
			case BATTLE_EVENTS.SUBMISSION_MENU:
				return this.submissionMenu(resolve);
			default:
				return resolve();
		}
	}
}
