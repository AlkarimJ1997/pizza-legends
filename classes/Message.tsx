import { KeyPressListener } from '@/classes/KeyPressListener';
import { RevealingText } from '@/classes/RevealingText';
import type { OverworldState } from '@/classes/OverworldState';

interface MessageProps {
	text: string;
	onComplete: () => void;
	overworld: OverworldState;
}

export class Message {
	text: string;
	onComplete: () => void;
	overworld: OverworldState;

	actionListener: KeyPressListener;
	revealingText: RevealingText;

	constructor({ text, onComplete, overworld }: MessageProps) {
		this.text = text;
		this.onComplete = onComplete;
		this.overworld = overworld;

		this.actionListener = new KeyPressListener('Enter', () => {
			this.done();
		});

		// Revealing text
		this.revealingText = new RevealingText({ element: this });
		this.revealingText.init();
	}

	done() {
		if (!this.revealingText.isDone) {
			this.revealingText.warpToDone();
			return;
		}

		this.overworld.message = null;
		this.actionListener.unbind();
		this.onComplete();
	}
}
