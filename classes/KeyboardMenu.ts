export class KeyboardMenu {
	options: PageOption[] = [];
	up: string | null = null;
	down: string | null = null;
	prevFocus: string | null = null;

	constructor() {}

	setOptions(options: PageOption[]) {
		this.options = options;
	}

	init() {}
}
