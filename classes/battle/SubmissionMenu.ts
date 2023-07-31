import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { Battle } from '@/classes/battle/Battle';
import type { Combatant } from '@/classes/battle/Combatant';
import Moves from '@/data/MoveMap';

type PageTree = {
	[key: string]: PageOption[];
};

interface SubmissionMenuProps {
	caster: Combatant;
	target: Combatant;
	battle: Battle;
	onComplete: (value: Submission) => void;
}

export class SubmissionMenu {
	caster: Combatant;
	target: Combatant;
	battle: Battle;
	onComplete: (value: Submission) => void;

	constructor({ caster, target, battle, onComplete }: SubmissionMenuProps) {
		this.caster = caster;
		this.target = target;
		this.battle = battle;
		this.onComplete = onComplete;
	}

	getPages(): PageTree {
		return {
			root: [
				{
					label: 'Attack',
					description: 'Choose an attack',
					handler: () => {
						// Do something when chosen...
						console.log('Attack chosen');
					},
				},
				{
					label: 'Items',
					description: 'Choose an item',
					handler: () => {
						// Go to items page
					},
				},
				{
					label: 'Swap',
					description: 'Change to another pizza',
					handler: () => {
						// See pizza options
					},
				},
			],
			attacks: [],
		};
	}

	decide() {
		this.onComplete({
			move: Moves[this.caster.config.moves[0]],
			target: this.target,
		});
	}

	showMenu() {
		this.battle.keyboardMenu = new KeyboardMenu();
		this.battle.keyboardMenu.init();
		this.battle.keyboardMenu.setOptions(this.getPages().root);
	}

	init() {
		if (this.caster.config.isPlayerControlled) {
			this.showMenu();
			return;
		}

		this.decide();
	}
}
