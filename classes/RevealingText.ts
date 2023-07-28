import { Message } from '@/classes/Message';

export class RevealingText {
	element: Message;
	speed: number;

	characters: RevealingCharacter[] = [];
  isDone: boolean = false;

	constructor(config: { element: Message; speed?: number }) {
		this.element = config.element;
		this.speed = config.speed || 70;
	}

	warpToDone() {
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
	}
}
