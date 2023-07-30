import { Battle } from '@/classes/battle/Battle';
import { ANIMATIONS, BATTLE_EVENTS, EVENTS, STATUSES } from '@/utils/consts';

interface CombatantProps {
	config: CombatantConfig;
	battle: Battle;
}

export class Combatant {
	config: CombatantConfig;
	battle: Battle;

	isBlinking: boolean = false;
	animation: BattleAnimationName | null = null;

	constructor({ config, battle }: CombatantProps) {
		this.config = config;
		this.battle = battle;
	}

	get hpPercentage() {
		const percent = (this.config.hp / this.config.maxHp) * 100;

		return Math.min(Math.max(percent, 0), 100);
	}

	get xpPercentage() {
		return (this.config.xp / this.config.maxXp) * 100;
	}

	get isActive() {
		const { id, belongsToTeam } = this.config;

		return this.battle.activeCombatants[belongsToTeam] === id;
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
