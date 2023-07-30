import type { Combatant } from '@/classes/battle/Combatant';
import Moves from '@/data/MoveMap';

interface SubmissionMenuProps {
	caster: Combatant;
	target: Combatant;
	onComplete: (value: Submission) => void;
}

export class SubmissionMenu {
	caster: Combatant;
	target: Combatant;
	onComplete: (value: Submission) => void;

	constructor({ caster, target, onComplete }: SubmissionMenuProps) {
		this.caster = caster;
		this.target = target;
		this.onComplete = onComplete;
	}

	decide() {
		this.onComplete({
			move: Moves[this.caster.config.moves[0]],
			target: this.target,
		});
	}

	init() {
		this.decide();
	}
}
