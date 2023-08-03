import { BATTLE_EVENTS, EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import { SubmissionMenu } from '@/classes/battle/SubmissionMenu';
import type { Battle } from '@/classes/battle/Battle';
import { wait } from '@/utils/helpers';
import Animations from '@/data/AnimationMap';
import type { Combatant } from '@/classes/battle/Combatant';

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
			.replace('{ACTION}', submission?.action.name.toUpperCase() ?? '');

		this.battle.overworld.message = new Message({
			text: updatedText,
			onComplete: () => resolve(),
			overworld: this.battle.overworld,
		});
	}

	async stateChange(resolve: ResolveFn) {
		const event = this.event as StateChangeEvent;

		if (!event.submission) return resolve();

		let who = event.onCaster ? event.caster : event.submission.target;

		if (event.damage) {
			// Modify the target's health
			event.submission.target.update({
				hp: event.submission.target.config.hp - event.damage,
			});

			// Start blinking
			event.submission.target.isBlinking = true;
		}

		if (event.recovery) {
			who?.update({
				hp: Math.min(who.config.hp + event.recovery, who.config.maxHp),
			});
		}

		if (event.status) {
			who?.update({ status: { ...event.status } });
		}

		if (event.status === null) {
			who?.update({ status: null });
		}

		// Stop blinking
		await wait(600);
		event.submission.target.isBlinking = false;

		// Resolve
		resolve();
	}

	submissionMenu(resolve: ResolveFn) {
		const { caster, target, battle } = this.event as SubmissionMenuEvent;

		const menu = new SubmissionMenu({
			caster,
			target,
			battle,
			onComplete: (submission: Submission) => {
				resolve(submission);
			},
		});

		menu.init();
	}

	replacementMenu(resolve: ResolveFn) {
    const menu = new ReplacementMenu({
      onComplete: (replacement: Combatant) => {
        resolve(replacement);
      }
    })
    
    menu.init();
  }

	async swap(resolve: ResolveFn) {
		const { replacement } = this.event as PizzaSwapEvent;

		this.battle.activeCombatants[replacement.team] = null;
		await wait(400);

		this.battle.activeCombatants[replacement.team] = replacement.config.id;
		await wait(400);

		resolve();
	}

	animation(resolve: ResolveFn) {
		if (!('animation' in this.event)) {
			throw new Error('Animation event must have an animation property');
		}

		Animations[this.event.animation](this.event, resolve);
	}

	init(resolve: ResolveFn) {
		switch (this.event.type) {
			case EVENTS.MESSAGE:
				return this.textMessage(resolve);
			case BATTLE_EVENTS.SUBMISSION_MENU:
				return this.submissionMenu(resolve);
        case BATTLE_EVENTS.REPLACEMENT_MENU:
          return this.replacementMenu(resolve);
			case BATTLE_EVENTS.STATE_CHANGE:
				return this.stateChange(resolve);
			case BATTLE_EVENTS.ANIMATION:
				return this.animation(resolve);
			case BATTLE_EVENTS.SWAP:
				return this.swap(resolve);
			default:
				return resolve();
		}
	}
}
