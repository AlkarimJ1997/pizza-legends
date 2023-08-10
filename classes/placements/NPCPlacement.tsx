import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import { OverworldEvent } from '@/classes/OverworldEvent';
import type { OverworldState } from '@/classes/OverworldState';
import Sprite from '@/components/Sprite';

export class NPCPlacement extends PersonPlacement {
	tickBetweenMovesInterval: number;
	ticksUntilNextMove: number;
	activeEvent: boolean = false;

	constructor(config: PersonConfig, overworld: OverworldState) {
		super(config, overworld);

		this.tickBetweenMovesInterval = 28;
		this.ticksUntilNextMove = this.tickBetweenMovesInterval;
	}

	tickAttemptAiMove() {
		if (this.activeEvent || this.overworld.isCutscenePlaying) return;

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

		let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
		eventConfig.who = this.id ?? '';

		this.activeEvent = true;

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
		return (
			<Sprite
				skinSrc={this.skin}
				isMoving={this.isMoving}
				direction={this.movingPixelDirection}
			/>
		);
	}
}
