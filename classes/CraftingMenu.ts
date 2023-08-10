import { KeyboardMenu } from '@/classes/KeyboardMenu';
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

	getOptions(): PageOption[] {
		return [{ label: 'Test', description: 'description', handler: () => {} }];
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
