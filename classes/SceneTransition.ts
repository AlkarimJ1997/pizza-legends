import type { OverworldState } from '@/classes/OverworldState';

interface SceneTransitionProps {
	overworld: OverworldState;
	callback: () => void;
}

export class SceneTransition {
	overworld: OverworldState;
	callback: () => void;

	exit: boolean = false;

	constructor({ overworld, callback }: SceneTransitionProps) {
		this.overworld = overworld;
		this.callback = callback;
	}

	fadeOut() {
		this.exit = true;

		setTimeout(() => {
			this.exit = false;
			this.overworld.sceneTransition = null;
		}, 500);
	}

	init() {
		this.overworld.sceneTransition = this;

		setTimeout(() => {
			this.callback();
		}, 500);
	}
}
