export class Battle {
  onComplete: () => void;
  
	constructor({ onComplete }: { onComplete: () => void }) {
    this.onComplete = onComplete;
  }

	init() {}
}
