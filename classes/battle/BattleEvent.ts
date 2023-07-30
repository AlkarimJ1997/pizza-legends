import { BATTLE_EVENTS, EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import { SubmissionMenu } from '@/classes/battle/SubmissionMenu';
import type { Battle } from '@/classes/battle/Battle';

type ResolveFn = (value: void | Submission) => void;

export class BattleEvent {
	event: BattleAction;
	battle: Battle;

	constructor(event: BattleAction, battle: Battle) {
		this.event = event;
		this.battle = battle;
	}

	textMessage(resolve: ResolveFn) {
		if (!('text' in this.event)) return resolve();

		const { text, caster, submission } = this.event;

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
			default:
				return resolve();
		}
	}
}
