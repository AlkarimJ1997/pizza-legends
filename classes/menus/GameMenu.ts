import type { Progress } from '@/classes/state/Progress';
import type { OverworldState } from '@/classes/OverworldState';
import { KeyboardMenu } from '@/classes/KeyboardMenu';

export class GameMenu {
	overworld: OverworldState;
	keyboardMenu: KeyboardMenu | null = null;

	constructor({ overworld }: { overworld: OverworldState }) {
		this.overworld = overworld;
	}

	getOptions(resolve: () => void): PageOption[] {
		return [
			{
				label: 'New Game',
				description: 'Start a new pizza adventure!',
				handler: () => {
					this.close();
					resolve();
				},
			},
		];
	}

	close() {
		this.keyboardMenu = null;
		this.overworld.gameMenu = null;
	}

	init() {
		return new Promise<void>(resolve => {
			this.keyboardMenu = new KeyboardMenu();
			this.keyboardMenu.setOptions(this.getOptions(resolve));
		});
	}
}
