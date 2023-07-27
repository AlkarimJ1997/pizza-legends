import { KeyPressListener } from '@/classes/KeyPressListener';
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

	constructor({ text, onComplete, overworld }: MessageProps) {
		this.text = text;
		this.onComplete = onComplete;
		this.overworld = overworld;

		this.actionListener = new KeyPressListener('Enter', () => {
			this.actionListener.unbind();
			this.done();
		});
	}

	done() {
		this.overworld.message = null;
		this.onComplete();
	}
}
