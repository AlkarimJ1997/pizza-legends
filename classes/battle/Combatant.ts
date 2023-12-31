import { Battle } from '@/classes/battle/Battle';
import { BATTLE_EVENTS, EVENTS, STATUSES } from '@/utils/consts';
import { randomFromArray } from '@/utils/helpers';

interface CombatantProps {
	config: CombatantConfig;
	battle: Battle;
}

export class Combatant {
	config: CombatantConfig;
	battle: Battle;

	isBlinking: boolean = false;

	// Animation variables
	animateSpin: boolean = false;
	animateGlob: boolean = false;

	constructor({ config, battle }: CombatantProps) {
		this.config = config;
		this.battle = battle;
	}

	get hp() {
		const percent = (this.config.hp / this.config.maxHp) * 100;

		return Math.min(Math.max(percent, 0), 100);
	}

	get xp() {
		return (this.config.xp / this.config.maxXp) * 100;
	}

	get isActive() {
		const { id, belongsToTeam } = this.config;

		return this.battle.activeCombatants[belongsToTeam] === id;
	}

	get team() {
		return this.config.belongsToTeam;
	}

	get givesExp() {
		return this.config.level * 20;
	}

	getPostEvents(): BattleAction[] {
		if (this.config.status?.type === STATUSES.SAUCY) {
			return [
				{ type: EVENTS.MESSAGE, text: "Feelin' saucy!" },
				{ type: BATTLE_EVENTS.STATE_CHANGE, recovery: 5, onCaster: true },
			];
		}

		return [];
	}

	getReplacedEvents(events: BattleAction[]) {
		const fail = randomFromArray([true, false, false]);

		if (this.config.status?.type === STATUSES.CLUMSY && fail) {
			return [
				{ type: EVENTS.MESSAGE, text: `${this.config.name} flops over!` },
			];
		}

		return events;
	}

	decrementStatus() {
		if (!this.config.status) return;

		this.config.status.expiresIn--;

		if (this.config.status.expiresIn <= 0) {
			const { type } = this.config.status;

			this.update({ status: null });
			return {
				type: EVENTS.MESSAGE,
				text: `${this.config.name} is no longer ${type}!`,
			};
		}
	}

	update(changes: Partial<CombatantConfig> = {}) {
		this.config = {
			...this.config,
			...changes,
		};
	}

	init() {}
}
