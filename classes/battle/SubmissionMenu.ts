import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { Battle } from '@/classes/battle/Battle';
import type { Combatant } from '@/classes/battle/Combatant';
import Actions from '@/data/ActionMap';

type PageTree = {
	[key: string]: PageOption[];
};

type QuantityConfig = {
	actionId: ActionName;
	quantity: number;
	instanceId: string;
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

	items: QuantityConfig[] = [];

	constructor({ caster, target, battle, onComplete }: SubmissionMenuProps) {
		this.caster = caster;
		this.target = target;
		this.battle = battle;
		this.onComplete = onComplete;

		this.battle.items.forEach(({ actionId, instanceId, team }) => {
			if (team === caster.config.belongsToTeam) {
				let existing = this.items.find(i => i.actionId === actionId);

				if (existing) {
					existing.quantity++;
					return;
				}

				this.items.push({
					actionId,
					quantity: 1,
					instanceId,
				});
			}
		});
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
				...this.caster.config.actions.map(action => {
					const actionData = Actions[action];

					return {
						label: actionData.name,
						description: actionData.description,
						handler: () => {
							this.menuSubmit(actionData);
						},
					};
				}),
				backOption,
			],
			items: [
				...this.items.map(item => {
					const actionData = Actions[item.actionId];

					return {
						label: actionData.name,
						description: actionData.description,
						right: () => `x${item.quantity}`,
						handler: () => {
							this.menuSubmit(actionData, item.instanceId);
						},
					};
				}),
				backOption,
			],
		};
	}

	menuSubmit(action: ActionConfig, instanceId: string | null = null) {
		const target = action.targetType === 'FRIENDLY' ? this.caster : this.target;

		this.battle.keyboardMenu = null;
		this.onComplete({ action, target, instanceId });
	}

	decide() {
		this.menuSubmit(Actions[this.caster.config.actions[0]]);
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
