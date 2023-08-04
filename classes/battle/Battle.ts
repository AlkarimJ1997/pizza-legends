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
	items: ItemConfig[] = [];

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
		this.loadCombatants();
	}

	loadCombatants() {
		this.overworld.playerState?.lineup.forEach(id => {
			const config = this.overworld.playerState?.party.find(p => p.id === id);

			if (!config) {
				throw new Error(`Invalid pizza ID ${id}, check playerState lineup`);
			}

			this.combatants.push(
				new Combatant({
					config: { ...config, isPlayerControlled: true },
					battle: this,
				})
			);
      
			this.activeCombatants[TEAMS.PLAYER] ??= id;
		});

		this.trainer.pizzas.forEach(({ pizzaId, hp, maxHp, level }) => {
			const id = uuid();

			this.combatants.push(
				new Combatant({
					config: {
						...Pizzas[pizzaId],
						id,
						belongsToTeam: TEAMS.ENEMY,
						hp: hp ?? maxHp,
						maxHp,
						xp: 0,
						maxXp: 100,
						level,
					},
					battle: this,
				})
			);

			this.activeCombatants[TEAMS.ENEMY] ??= id;
		});

		console.log(this.combatants);
		console.log(this.activeCombatants);
	}

	// private addCombatant(
	// 	id: string,
	// 	team: keyof typeof TEAMS,
	// 	config: CombatantConfig | TrainerPizza
	// ) {
	// 	this.combatants.push(
	// 		new Combatant({
	// 			config: {
	// 				belongsToTeam: team,
	// 				isPlayerControlled: team === TEAMS.PLAYER,
	// 			},
	// 			battle: this,
	// 		})
	// 	);

	// 	this.activeCombatants[team] ??= id;
	// }

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
