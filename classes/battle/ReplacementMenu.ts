import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { TEAMS } from '@/utils/consts';
import type { Battle } from '@/classes/battle/Battle';
import type { Combatant } from '@/classes/battle/Combatant';

interface ReplacementMenuProps {
	team: keyof typeof TEAMS;
	battle: Battle;
	onComplete: (value: Combatant) => void;
}

export class ReplacementMenu {
	team: keyof typeof TEAMS;
	battle: Battle;
	onComplete: (value: Combatant) => void;

	replacements: Combatant[] = [];

	constructor({ team, battle, onComplete }: ReplacementMenuProps) {
		this.team = team;
		this.battle = battle;
		this.onComplete = onComplete;

		this.replacements = this.battle.combatants.filter(c => {
			return c.team === team && c.hp > 0;
		});
	}

	decide() {
		this.menuSubmit(this.replacements[0]);
	}

	menuSubmit(replacement: Combatant) {
		this.battle.keyboardMenu = null;
		this.onComplete(replacement);
	}

	showMenu() {
		this.battle.keyboardMenu = new KeyboardMenu();
		this.battle.keyboardMenu.setOptions(
			this.replacements.map(c => ({
				label: c.config.name,
				description: c.config.description,
				handler: () => this.menuSubmit(c),
			}))
		);
	}

	init() {
		if (this.replacements[0].config.isPlayerControlled) {
			this.showMenu();
			return;
		}

		this.decide();
	}
}
