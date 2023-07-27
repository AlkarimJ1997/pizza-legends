export class KeyPressListener {
	keydownFunction: (e: KeyboardEvent) => void;
	keyupFunction: (e: KeyboardEvent) => void;

	constructor(key: string, callback: () => void) {
		let keySafe = true;

		this.keydownFunction = (e: KeyboardEvent) => {
			if (e.key === key && keySafe) {
				keySafe = false;
				callback();
			}
		};

		this.keyupFunction = (e: KeyboardEvent) => {
			if (e.key === key) keySafe = true;
		};

		// Add event listeners
		document.addEventListener('keydown', this.keydownFunction);
		document.addEventListener('keyup', this.keyupFunction);
	}

	unbind() {
		document.removeEventListener('keydown', this.keydownFunction);
		document.removeEventListener('keyup', this.keyupFunction);
	}
}
