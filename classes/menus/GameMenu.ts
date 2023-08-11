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
          this.overworld.shouldLoad = false;
					this.close();
					resolve();
				},
			},
			this.overworld.progress.saveExists
				? {
						label: 'Continue Game',
						description: 'Continue your pizza adventure!',
						handler: () => {
              this.overworld.shouldLoad = true;
							this.close();
							resolve();
						},
				  }
				: null,
		].filter(Boolean);
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
