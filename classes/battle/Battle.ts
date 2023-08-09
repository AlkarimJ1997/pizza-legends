import { Combatant } from '@/classes/battle/Combatant';
import { BattleEvent } from '@/classes/battle/BattleEvent';
import { TurnCycle } from '@/classes/battle/TurnCycle';
import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { TEAMS } from '@/utils/consts';
import type { OverworldState } from '@/classes/OverworldState';
import { Team } from '@/classes/battle/Team';
import Pizzas from '@/data/PizzaMap';
import { v4 as uuid } from 'uuid';
import { playerState } from '@/classes/state/PlayerState';

interface BattleProps {
	trainer: TrainerConfig;
	overworld: OverworldState;
	onComplete: (didWin: boolean) => void;
}

type ActiveCombatants = {
	PLAYER: string | null;
	ENEMY: string | null;
};

export class Battle {
	trainer: TrainerConfig;
	overworld: OverworldState;
	onComplete: (didWin: boolean) => void;

	combatants: Combatant[] = [];
	activeCombatants: ActiveCombatants = { PLAYER: null, ENEMY: null };
	items: ItemConfig[] = [];
	usedInstanceIds: { [key: string]: boolean } = {};

	turnCycle: TurnCycle | null = null;
	keyboardMenu: KeyboardMenu | null = null;

	playerTeam: Team | null = null;
	trainerTeam: Team | null = null;

	constructor({ trainer, overworld, onComplete }: BattleProps) {
		this.trainer = trainer;
		this.overworld = overworld;
		this.onComplete = onComplete;

		this.loadCombatants();
		this.loadItems();
	}

	private addCombatant(config: CombatantConfig) {
		this.combatants.push(new Combatant({ config, battle: this }));
		this.activeCombatants[config.belongsToTeam] ??= config.id;
	}

	loadCombatants() {
		playerState.lineup.forEach(id => {
			const config = playerState.party.find(p => p.id === id);

			if (!config) {
				throw new Error(`Invalid pizza ID ${id}, check playerState lineup`);
			}

			this.addCombatant({ ...config, isPlayerControlled: true });
		});

		this.trainer.pizzas.forEach(({ pizzaId, hp, maxHp, level }) => {
			this.addCombatant({
				...Pizzas[pizzaId],
				id: uuid(),
				belongsToTeam: TEAMS.ENEMY,
				hp: hp ?? maxHp,
				maxHp,
				xp: 0,
				maxXp: 100,
				level,
			});
		});
	}

	loadItems() {
		this.items = playerState.inventory.map(i => ({ ...i, team: TEAMS.PLAYER }));
	}

	loadTeams() {
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
	}

	handleStateUpdate() {
		playerState.party.forEach(p => {
			const battlePizza = this.combatants.find(c => c.config.id === p.id);

			if (battlePizza) {
				p.hp = battlePizza.config.hp;
				p.xp = battlePizza.config.xp;
				p.maxXp = battlePizza.config.maxXp;
				p.level = battlePizza.config.level;
			}
		});

		// Get rid of player's used items
		playerState.inventory = playerState.inventory.filter(({ instanceId }) => {
			return !this.usedInstanceIds[instanceId];
		});
	}

	endBattle(didWin: boolean) {
		this.overworld.battle = null;
		this.onComplete(didWin);
	}

	init() {
		this.loadTeams();

		this.turnCycle = new TurnCycle({
			battle: this,
			onNewEvent: event => {
				return new Promise(resolve => {
					const battleEvent = new BattleEvent(event, this);
					battleEvent.init(resolve);
				});
			},
			onWinner: winner => {
				// Only update state if player won (to be nice to the player)
				const didWin = winner === TEAMS.PLAYER;

				didWin && this.handleStateUpdate();
				this.endBattle(didWin);
			},
		});

		this.turnCycle.init();
	}
}
