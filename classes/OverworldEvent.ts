import type { OverworldState } from '@/classes/OverworldState';
import { PersonPlacement } from '@/classes/PersonPlacement';
import { BEHAVIOR_TYPES, CUSTOM_EVENTS } from '@/utils/consts';

interface OverworldEventProps {
	overworld: OverworldState;
	event: BehaviorEvent;
}

export class OverworldEvent {
	overworld: OverworldState;
	event: BehaviorEvent;

	constructor({ overworld, event }: OverworldEventProps) {
		this.overworld = overworld;
		this.event = event;
	}

	stand(resolve: () => void) {
		const who = this.overworld.placements.find(p => p.id === this.event.who);

		if (!who) return resolve();

		(who as PersonPlacement).startBehavior({
			type: BEHAVIOR_TYPES.STAND,
			direction: this.event.direction,
			time: this.event.time,
		});

		const completeHandler = (e: CustomEvent<{ whoId: string }>) => {
			if (e.detail.whoId !== who.id) return;

			document.removeEventListener(CUSTOM_EVENTS.STAND, completeHandler);
			resolve();
		};

		document.addEventListener(CUSTOM_EVENTS.STAND, completeHandler);
	}

	walk(resolve: () => void) {
		const who = this.overworld.placements.find(p => p.id === this.event.who);

		if (!who) return resolve();

		(who as PersonPlacement).startBehavior({
			type: BEHAVIOR_TYPES.WALK,
			direction: this.event.direction,
		});

		const completeHandler = (e: CustomEvent<{ whoId: string }>) => {
			if (e.detail.whoId !== who.id) return;

			document.removeEventListener(CUSTOM_EVENTS.WALK, completeHandler);
			resolve();
		};

		document.addEventListener(CUSTOM_EVENTS.WALK, completeHandler);
	}

	init() {
		return new Promise<void>(resolve => {
			switch (this.event.type) {
				case BEHAVIOR_TYPES.STAND:
					return this.stand(resolve);
				case BEHAVIOR_TYPES.WALK:
					return this.walk(resolve);
				default:
					return resolve();
			}
		});
	}
}
