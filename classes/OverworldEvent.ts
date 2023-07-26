import type { OverworldState } from '@/classes/OverworldState';
import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import TextMessage from '@/components/TextMessage';
import { BEHAVIOR_TYPES, CUSTOM_EVENTS, PLACEMENT_TYPES } from '@/utils/consts';

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

		if (!who || !('time' in this.event)) return resolve();

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

		if (!who || !('direction' in this.event)) return resolve();

		(who as PersonPlacement).startBehavior({
			type: BEHAVIOR_TYPES.WALK,
			direction: this.event.direction,
			retry: true,
		});

		const completeHandler = (e: CustomEvent<{ whoId: string }>) => {
			if (e.detail.whoId !== who.id) return;

			document.removeEventListener(CUSTOM_EVENTS.WALK, completeHandler);
			resolve();
		};

		document.addEventListener(CUSTOM_EVENTS.WALK, completeHandler);
	}

	textMessage(resolve: () => void) {
		if (!('text' in this.event)) return resolve();

		this.overworld.addPlacement({
			text: this.event.text,
			type: PLACEMENT_TYPES.MESSAGE,
		});
	}

	init() {
		return new Promise<void>(resolve => {
			switch (this.event.type) {
				case BEHAVIOR_TYPES.STAND:
					return this.stand(resolve);
				case BEHAVIOR_TYPES.WALK:
					return this.walk(resolve);
				case BEHAVIOR_TYPES.MESSAGE:
					return this.textMessage(resolve);
				default:
					return resolve();
			}
		});
	}
}
