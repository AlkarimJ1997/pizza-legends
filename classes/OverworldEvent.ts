import { Message } from '@/classes/Message';
import type { OverworldState } from '@/classes/OverworldState';
import type { NPCPlacement } from '@/classes/placements/NPCPlacement';
import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import TextMessage from '@/components/TextMessage';
import { BEHAVIOR_TYPES, CUSTOM_EVENTS, PLACEMENT_TYPES } from '@/utils/consts';
import { oppositeDirection } from '@/utils/helpers';

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

	// Type Guards
	private isStandEvent(event: BehaviorEvent): event is StandEvent {
		return event.type === BEHAVIOR_TYPES.STAND;
	}

	private isWalkEvent(event: BehaviorEvent): event is WalkEvent {
		return event.type === BEHAVIOR_TYPES.WALK;
	}

	private isMessageEvent(event: BehaviorEvent): event is MessageEvent {
		return event.type === BEHAVIOR_TYPES.MESSAGE;
	}

	stand(resolve: () => void) {
		if (!this.isStandEvent(this.event)) {
			throw new Error('Event is not a stand event');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
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
		if (!this.isWalkEvent(this.event)) {
			throw new Error('Event is not a walk event');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
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
		if (!this.isMessageEvent(this.event)) {
			throw new Error('Event is not a message event');
		}

		if (this.event.faceHero) {
			const hero = this.overworld.heroRef;
			const who = this.overworld.placements.find(p => {
				return p.id === this.event.faceHero;
			}) as NPCPlacement;

			if (who && hero) {
				who.movingPixelDirection = oppositeDirection(hero.movingPixelDirection);
				who.updateSprite();
			}
		}

		this.overworld.message = new Message({
			text: this.event.text,
			onComplete: () => resolve(),
			overworld: this.overworld,
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
