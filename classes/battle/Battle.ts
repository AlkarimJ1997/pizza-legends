import { Combatant } from '@/classes/battle/Combatant';
import { TEAMS } from '@/utils/consts';
import Pizzas from '@/data/PizzaMap';

type ActiveCombatants = {
	PLAYER: string;
	ENEMY: string;
};

export class Battle {
	combatants: { [key: string]: Combatant };
	activeCombatants: ActiveCombatants;
	onComplete: () => void;

	constructor({ onComplete }: { onComplete: () => void }) {
		this.combatants = {
			player1: new Combatant({
				config: {
					...Pizzas.s001,
					belongsToTeam: TEAMS.PLAYER,
					hp: 30,
					maxHp: 50,
					xp: 75,
					maxXp: 100,
					level: 1,
					status: null,
				},
				battle: this,
			}),
			enemy1: new Combatant({
				config: {
					...Pizzas.v001,
					belongsToTeam: TEAMS.ENEMY,
					hp: 20,
					maxHp: 50,
					xp: 20,
					maxXp: 100,
					level: 1,
				},
				battle: this,
			}),
			enemy2: new Combatant({
				config: {
					...Pizzas.f001,
					belongsToTeam: TEAMS.ENEMY,
					hp: 25,
					maxHp: 50,
					xp: 30,
					maxXp: 100,
					level: 1,
				},
				battle: this,
			}),
		};

		this.activeCombatants = {
			PLAYER: 'player1',
			ENEMY: 'enemy1',
		};

		this.onComplete = onComplete;
	}

	init() {}
}
