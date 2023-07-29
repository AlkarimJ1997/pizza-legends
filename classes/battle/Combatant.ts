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

	init() {}
}
