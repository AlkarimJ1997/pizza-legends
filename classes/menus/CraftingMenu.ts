import { KeyboardMenu } from '@/classes/KeyboardMenu';
import { playerState } from '@/classes/state/PlayerState';
import Pizzas from '@/data/PizzaMap';

interface CraftingMenuProps {
	pizzas: (keyof typeof Pizzas)[];
	onComplete: () => void;
}

export class CraftingMenu {
	pizzas: (keyof typeof Pizzas)[];
	onComplete: () => void;

	keyboardMenu: KeyboardMenu | null = null;

	constructor({ pizzas, onComplete }: CraftingMenuProps) {
		this.pizzas = pizzas;
		this.onComplete = onComplete;
	}

	get title() {
		return 'Create a Pizza';
	}

	getOptions(): PageOption[] {
		return this.pizzas.map(id => {
			const base = Pizzas[id];

			return {
				label: base.name,
				description: base.description,
				handler: () => {
					playerState.addMember(id);
					this.close();
				},
			};
		});
	}

	close() {
		this.keyboardMenu = null;
		this.onComplete();
	}

	init() {
		this.keyboardMenu = new KeyboardMenu();
		this.keyboardMenu.setOptions(this.getOptions());
	}
}
