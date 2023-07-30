import { Combatant } from '@/classes/battle/Combatant';
import { STATUSES, TEAMS } from '@/utils/consts';
import Pizzas from '@/data/PizzaMap';
import { TurnCycle } from '@/classes/battle/TurnCycle';
import { BattleEvent } from '@/classes/battle/BattleEvent';
import type { OverworldState } from '@/classes/OverworldState';

interface BattleProps {
	onComplete: () => void;
	overworld: OverworldState;
}

type ActiveCombatants = {
	PLAYER: string;
	ENEMY: string;
};

export class Battle {
	combatants: Combatant[];
	activeCombatants: ActiveCombatants;
	overworld: OverworldState;
	onComplete: () => void;

	turnCycle: TurnCycle | null = null;

	constructor({ overworld, onComplete }: BattleProps) {
		this.combatants = [
			new Combatant({
				config: {
					...Pizzas.s001,
					id: 'player1',
					belongsToTeam: TEAMS.PLAYER,
					hp: 30,
					maxHp: 50,
					xp: 75,
					maxXp: 100,
					level: 1,
          isPlayerControlled: true,
				},
				battle: this,
			}),
			new Combatant({
				config: {
					...Pizzas.v001,
					id: 'enemy1',
					belongsToTeam: TEAMS.ENEMY,
					hp: 20,
					maxHp: 50,
					xp: 20,
					maxXp: 100,
					level: 1,
				},
				battle: this,
			}),
			new Combatant({
				config: {
					...Pizzas.f001,
					id: 'enemy2',
					belongsToTeam: TEAMS.ENEMY,
					hp: 25,
					maxHp: 50,
					xp: 30,
					maxXp: 100,
					level: 1,
				},
				battle: this,
			}),
		];

		this.activeCombatants = {
			PLAYER: 'player1',
			ENEMY: 'enemy1',
		};

		this.overworld = overworld;
		this.onComplete = onComplete;
	}

	init() {
		this.turnCycle = new TurnCycle({
			battle: this,
			onNewEvent: event => {
				return new Promise(resolve => {
					const battleEvent = new BattleEvent(event, this);
					battleEvent.init(resolve);
				});
			},
		});

		this.turnCycle.init();
	}
}
