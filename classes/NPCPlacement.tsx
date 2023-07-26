import { PersonPlacement } from '@/classes/PersonPlacement';
import type { OverworldState } from '@/classes/OverworldState';
import Person from '@/components/Person';
import { OverworldEvent } from '@/classes/OverworldEvent';

export class NPCPlacement extends PersonPlacement {
	tickBetweenMovesInterval: number;
	ticksUntilNextMove: number;
	activeEvent: boolean = false;

	constructor(properties: PlacementConfig, overworld: OverworldState) {
		super(properties, overworld);

		this.tickBetweenMovesInterval = 28;
		this.ticksUntilNextMove = this.tickBetweenMovesInterval;
	}

	tickAttemptAiMove() {
		if (this.activeEvent) return;

		if (this.ticksUntilNextMove > 0) {
			this.ticksUntilNextMove--;
			return;
		}

		this.internalMoveRequested();
	}

	async internalMoveRequested() {
		if (this.overworld.isCutscenePlaying || this.behaviorLoop.length === 0) {
			return;
		}

		this.activeEvent = true;

		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id ?? '';

		const eventHandler = new OverworldEvent({
			overworld: this.overworld,
			event: eventConfig,
		});
		await eventHandler.init();

		this.activeEvent = false;
		this.behaviorLoopIndex++;

		if (this.behaviorLoopIndex >= this.behaviorLoop.length) {
			this.behaviorLoopIndex = 0;
		}
	}

	renderComponent() {
		return <Person skinSrc={this.skin} frameCoord={this.frame} />;
	}
}
