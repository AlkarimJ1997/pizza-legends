import { Combatant } from '@/classes/battle/Combatant';
import { BattleEvent } from '@/classes/battle/BattleEvent';
import { TurnCycle } from '@/classes/battle/TurnCycle';
import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { STATUSES, TEAMS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import Pizzas from '@/data/PizzaMap';

interface BattleProps {
	onComplete: () => void;
	overworld: OverworldState;
}

type ActiveCombatants = {
	PLAYER: string | null;
	ENEMY: string | null;
};

export class Battle {
	combatants: Combatant[];
	activeCombatants: ActiveCombatants;
	items: ItemConfig[];
	overworld: OverworldState;
	onComplete: () => void;

	turnCycle: TurnCycle | null = null;
	keyboardMenu: KeyboardMenu | null = null;

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
					status: {
						type: STATUSES.SAUCY,
						expiresIn: 3,
					},
					isPlayerControlled: true,
				},
				battle: this,
			}),
			new Combatant({
				config: {
					...Pizzas.s002,
					id: 'player2',
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

		this.items = [
			{ actionId: 'item_recoverStatus', instanceId: 'p1', team: TEAMS.PLAYER },
			{ actionId: 'item_recoverStatus', instanceId: 'p2', team: TEAMS.PLAYER },
			{ actionId: 'item_recoverStatus', instanceId: 'p3', team: TEAMS.ENEMY },
			{ actionId: 'item_recoverHp', instanceId: 'p4', team: TEAMS.PLAYER },
		];

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
