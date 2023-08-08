import { KeyPressListener } from '@/classes/KeyPressListener';
import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { wait } from '@/utils/helpers';

export class Pause {
	onComplete: () => void;

	keyboardMenu: KeyboardMenu | null = null;
	escapeBind: KeyPressListener | null = null;

	constructor({ onComplete }: { onComplete: () => void }) {
		this.onComplete = onComplete;
	}

	getOptions(pageKey: 'root') {
		switch (pageKey) {
			case 'root':
				return [
					// ... All pizzas
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
			default:
				return [];
		}
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
