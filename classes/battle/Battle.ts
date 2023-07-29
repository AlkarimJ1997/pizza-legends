import { Combatant } from '@/classes/battle/Combatant';
import { TEAMS } from '@/utils/consts';
import Pizzas from '@/data/PizzaMap';

export class Battle {
	combatants: { [key: string]: Combatant };
	onComplete: () => void;

	constructor({ onComplete }: { onComplete: () => void }) {
		this.combatants = {
			player1: new Combatant({
				config: {
					...Pizzas.s001,
					belongsToTeam: TEAMS.PLAYER,
					hp: 50,
					maxHp: 50,
					xp: 0,
					level: 1,
					status: null,
				},
				battle: this,
			}),
			enemy1: new Combatant({
				config: {
					...Pizzas.v001,
					belongsToTeam: TEAMS.ENEMY,
					hp: 50,
					maxHp: 50,
					xp: 20,
					level: 1,
				},
				battle: this,
			}),
			enemy2: new Combatant({
				config: {
					...Pizzas.f001,
					belongsToTeam: TEAMS.ENEMY,
					hp: 50,
					maxHp: 50,
					xp: 30,
					level: 1,
				},
				battle: this,
			}),
		};

		this.onComplete = onComplete;
	}

	init() {}
}
