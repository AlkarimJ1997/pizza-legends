export class KeyboardMenu {
	options: PageOption[] = [];
	up: string | null = null;
	down: string | null = null;
	prevFocus: HTMLButtonElement | null = null;

	constructor() {}

	setOptions(options: PageOption[]) {
		this.options = options;
	}

	init() {}
}
