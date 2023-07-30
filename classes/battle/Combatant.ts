import { Battle } from '@/classes/battle/Battle';
import { ANIMATIONS } from '@/utils/consts';

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

	update(changes: Partial<CombatantConfig> = {}) {
		this.config = {
			...this.config,
			...changes,
		};
	}

	init() {}
}
