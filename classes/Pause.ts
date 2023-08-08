import { KeyPressListener } from '@/classes/KeyPressListener';
import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { playerState } from '@/classes/state/PlayerState';
import { wait } from '@/utils/helpers';

export class Pause {
	onComplete: () => void;

	keyboardMenu: KeyboardMenu | null = null;
	escapeBind: KeyPressListener | null = null;

	constructor({ onComplete }: { onComplete: () => void }) {
		this.onComplete = onComplete;
	}

	getOptions(pageKey: string): PageOption[] {
		if (pageKey === 'root') {
			return [
				...playerState.lineup.map(id => {
					const member = playerState.party.find(m => m.id === id);

					if (!member) throw new Error(`Member not found`);

					return {
						label: member.name,
						description: member.description,
						handler: () => {
							this.keyboardMenu?.setOptions(this.getOptions(id));
						},
					};
				}),
				{
					label: 'Save',
					description: 'Save your progress',
					handler: () => {
						// TODO: Save
					},
				},
				{
					label: 'Close',
					description: 'Close the pause menu',
					handler: () => this.close(),
				},
			];
		}

		return [
			...playerState.party
				.filter(m => !playerState.lineup.includes(m.id))
				.map(({ name, description, id }) => ({
					label: `Swap for ${name}`,
					description,
					handler: () => {
						playerState.swapLineup(pageKey, id);
						this.keyboardMenu?.setOptions(this.getOptions('root'));
					},
				})),
			{
				label: 'Move to front',
				description: 'Move this pizza to the front of your party',
				handler: () => {
					this.keyboardMenu?.setOptions(this.getOptions('root'));
				},
			},
			{
				label: 'Back',
				description: 'Go back to the previous menu',
				handler: () => {
					this.keyboardMenu?.setOptions(this.getOptions('root'));
				},
			},
		];
	}

	close() {
		this.escapeBind?.unbind();
		this.keyboardMenu = null;
		this.onComplete();
	}

	async init() {
		this.keyboardMenu = new KeyboardMenu();
		this.keyboardMenu.setOptions(this.getOptions('root'));

		await wait(200); // delay so menu doesn't close immediately
		this.escapeBind = new KeyPressListener('Escape', () => this.close());
	}
}
