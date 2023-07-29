import { Combatant } from '@/classes/battle/Combatant';
import { STATUSES } from '@/utils/consts';

export class Battle {
	combatants: { [key: string]: Combatant };
	onComplete: () => void;

	constructor({ onComplete }: { onComplete: () => void }) {
		this.combatants = {
			player1: new Combatant(
				{
					hp: 50,
					maxHp: 50,
					xp: 0,
					level: 1,
					status: null,
				},
				this
			),
		};

		this.onComplete = onComplete;
	}

	init() {}
}
