import { Message } from '@/classes/Message';

export class RevealingText {
	element: Message;
	speed: number;

	characters: RevealingCharacter[] = [];
	timeout: NodeJS.Timeout | null = null;
	isDone: boolean = false;

	constructor(config: { element: Message; speed?: number }) {
		this.element = config.element;
		this.speed = config.speed || 60;
	}

	revealOneCharacter() {
		const next = this.characters.find(char => !char.show);

		if (!next) {
			this.isDone = true;
			return;
		}

		next.show = true;
		this.timeout = setTimeout(() => {
			this.revealOneCharacter();
		}, next.delayAfter);
	}

	warpToDone() {
		this.timeout && clearTimeout(this.timeout);
		this.isDone = true;
		this.characters.forEach(char => {
			char.show = true;
		});
	}

	init() {
		this.element.text.split('').forEach(char => {
			this.characters.push({
				char,
				delayAfter: char === ' ' ? 0 : this.speed,
				show: false,
			});
		});

		this.revealOneCharacter();
	}
}
