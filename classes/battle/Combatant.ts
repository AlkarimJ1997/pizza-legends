import { Battle } from '@/classes/battle/Battle';

interface CombatantProps {
	config: CombatantConfig;
	battle: Battle;
}

export class Combatant {
	config: CombatantConfig;
	battle: Battle;

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
		return (
			this.battle.activeCombatants[this.config.belongsToTeam] ===
			this.config.id
		);
	}

	update(changes: Partial<CombatantConfig> = {}) {
		this.config = {
			...this.config,
			...changes,
		};
	}

	init() {}
}
