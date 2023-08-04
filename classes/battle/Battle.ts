import { Combatant } from '@/classes/battle/Combatant';
import { BattleEvent } from '@/classes/battle/BattleEvent';
import { TurnCycle } from '@/classes/battle/TurnCycle';
import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { TEAMS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import { Team } from '@/classes/battle/Team';
import Pizzas from '@/data/PizzaMap';
import { v4 as uuid } from 'uuid';

interface BattleProps {
	trainer: TrainerConfig;
	overworld: OverworldState;
	onComplete: () => void;
}

type ActiveCombatants = {
	PLAYER: string | null;
	ENEMY: string | null;
};

export class Battle {
	trainer: TrainerConfig;
	overworld: OverworldState;
	onComplete: () => void;

	combatants: Combatant[] = [];
	activeCombatants: ActiveCombatants = { PLAYER: null, ENEMY: null };
	items: ItemConfig[];

	turnCycle: TurnCycle | null = null;
	keyboardMenu: KeyboardMenu | null = null;

	playerTeam: Team | null = null;
	trainerTeam: Team | null = null;

	constructor({ trainer, overworld, onComplete }: BattleProps) {
		this.trainer = trainer;
		this.overworld = overworld;
		this.onComplete = onComplete;
		// this.combatants = [
		// 	new Combatant({
		// 		config: {
		// 			...Pizzas.s001,
		// 			id: 'player1',
		// 			belongsToTeam: TEAMS.PLAYER,
		// 			hp: 30,
		// 			maxHp: 50,
		// 			xp: 95,
		// 			maxXp: 100,
		// 			level: 1,
		// 			status: {
		// 				type: STATUSES.SAUCY,
		// 				expiresIn: 3,
		// 			},
		// 			isPlayerControlled: true,
		// 		},
		// 		battle: this,
		// 	}),
		// 	new Combatant({
		// 		config: {
		// 			...Pizzas.s002,
		// 			id: 'player2',
		// 			belongsToTeam: TEAMS.PLAYER,
		// 			hp: 30,
		// 			maxHp: 50,
		// 			xp: 75,
		// 			maxXp: 100,
		// 			level: 1,
		// 			isPlayerControlled: true,
		// 		},
		// 		battle: this,
		// 	}),
		// 	new Combatant({
		// 		config: {
		// 			...Pizzas.v001,
		// 			id: 'enemy1',
		// 			belongsToTeam: TEAMS.ENEMY,
		// 			hp: 1,
		// 			maxHp: 50,
		// 			xp: 20,
		// 			maxXp: 100,
		// 			level: 1,
		// 		},
		// 		battle: this,
		// 	}),
		// 	new Combatant({
		// 		config: {
		// 			...Pizzas.f001,
		// 			id: 'enemy2',
		// 			belongsToTeam: TEAMS.ENEMY,
		// 			hp: 25,
		// 			maxHp: 50,
		// 			xp: 30,
		// 			maxXp: 100,
		// 			level: 1,
		// 		},
		// 		battle: this,
		// 	}),
		// ];

		window.playerState.lineup.forEach(id => {
			this.addCombatant(id, TEAMS.PLAYER, window.playerState.party[id]);
		});

    this.trainer.pizzas.forEach(pizza => {
      this.addCombatant(uuid(), TEAMS.ENEMY, pizza);
    })

		this.items = [
			// { actionId: 'item_recoverStatus', instanceId: 'p1', team: TEAMS.PLAYER },
			// { actionId: 'item_recoverStatus', instanceId: 'p2', team: TEAMS.PLAYER },
			// { actionId: 'item_recoverStatus', instanceId: 'p3', team: TEAMS.ENEMY },
			// { actionId: 'item_recoverHp', instanceId: 'p4', team: TEAMS.PLAYER },
		];
	}

	addCombatant(id: string, team: keyof typeof TEAMS, config: TrainerConfig) {
		this.combatants.push(
			new Combatant({
				config: {
					belongsToTeam: team,
					isPlayerControlled: team === TEAMS.PLAYER,
				},
				battle: this,
			})
		);

		this.activeCombatants[team] ??= id;
	}

	init() {
		this.playerTeam = new Team(TEAMS.PLAYER, 'Hero');
		this.trainerTeam = new Team(TEAMS.ENEMY, 'Trainer');

		// Load teams with combatants
		this.combatants.forEach(c => {
			if (c.team === TEAMS.PLAYER) {
				this.playerTeam?.combatants.push(c);
				return;
			}

			this.trainerTeam?.combatants.push(c);
		});

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
