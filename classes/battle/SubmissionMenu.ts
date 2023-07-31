import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { Battle } from '@/classes/battle/Battle';
import type { Combatant } from '@/classes/battle/Combatant';
import Moves from '@/data/MoveMap';
import { MOVE_TYPES } from '@/utils/consts';

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
		const backOption = {
			label: 'Back',
			description: 'Return to previous page',
			handler: () => {
				this.battle.keyboardMenu?.setOptions(this.getPages().root);
			},
		};

		return {
			root: [
				{
					label: 'Attack',
					description: 'Choose an attack',
					handler: () => {
						// Do something when chosen...
						this.battle.keyboardMenu?.setOptions(this.getPages().attacks);
					},
				},
				{
					label: 'Items',
					description: 'Choose an item',
					handler: () => {
						// Go to items page
						this.battle.keyboardMenu?.setOptions(this.getPages().items);
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
			attacks: [
				...this.caster.config.moves.map(move => {
					const moveData = Moves[move];

					return {
						label: moveData.name,
						description: moveData.description,
						handler: () => {
							this.menuSubmit(moveData);
						},
					};
				}),
				backOption,
			],
			items: [
				// Items go here
				backOption,
			],
		};
	}

	menuSubmit(move: MoveConfig, instanceId: string | null = null) {
		const target = move.targetType === 'FRIENDLY' ? this.caster : this.target;

		this.battle.keyboardMenu = null;
		this.onComplete({ move, target });
	}

	decide() {
		this.menuSubmit(Moves[this.caster.config.moves[0]]);
	}

	showMenu() {
		this.battle.keyboardMenu = new KeyboardMenu();
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
