import { Battle } from '@/classes/battle/Battle';

export class Combatant {
	config: CombatantConfig;
	battle: Battle;

	constructor(config: CombatantConfig, battle: Battle) {
		this.config = config;
		this.battle = battle;
	}

	init() {}
}
