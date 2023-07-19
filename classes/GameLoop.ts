export class GameLoop {
	static readonly FPS = 60;
	private rafCallback: number | null = null;
	private hasStopped: boolean = false;
	onStep: () => void;

	constructor(onStep: () => void) {
		this.onStep = onStep;
		this.start();
	}

	start() {
		const targetDeltaTime = 1000 / GameLoop.FPS;
		let lastFrameTime = performance.now();
		let accumulator = 0;

		const tick = (currentFrameTime: number) => {
			if (this.hasStopped) return;

			const deltaTime = currentFrameTime - lastFrameTime;

			lastFrameTime = currentFrameTime;
			accumulator += deltaTime;

			while (accumulator >= targetDeltaTime) {
				this.onStep();
				accumulator -= targetDeltaTime;
			}

			// Recapture the callback so we can cancel it
			this.rafCallback = requestAnimationFrame(tick);
		};

		// Initial kickoff
		this.rafCallback = requestAnimationFrame(tick);
	}

	stop() {
		if (!this.rafCallback) return;

		this.hasStopped = true;
		cancelAnimationFrame(this.rafCallback);
	}
}
