import { EVENTS } from '@/utils/consts';
import { Message } from '@/classes/Message';
import type { Battle } from '@/classes/battle/Battle';

export class BattleEvent {
	event: BattleAction;
	battle: Battle;

	constructor(event: BattleAction, battle: Battle) {
		this.event = event;
		this.battle = battle;
	}

	textMessage(resolve: () => void) {
		this.battle.overworld.message = new Message({
			text: this.event.text,
			onComplete: () => resolve(),
			overworld: this.battle.overworld,
		});
	}

	init(resolve: () => void) {
		switch (this.event.type) {
			case EVENTS.MESSAGE:
				return this.textMessage(resolve);
			default:
				return resolve();
		}
	}
}
