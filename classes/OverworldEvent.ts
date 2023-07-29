import { Message } from '@/classes/Message';
import type { OverworldState } from '@/classes/OverworldState';
import { SceneTransition } from '@/classes/SceneTransition';
import type { NPCPlacement } from '@/classes/placements/NPCPlacement';
import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import { BEHAVIOR_TYPES, CUSTOM_EVENTS } from '@/utils/consts';
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

	stand(resolve: () => void) {
		const { direction, time } = this.event as StandEvent;

		if (!direction || !time) {
			throw new Error('Stand event is missing direction or time');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
			type: BEHAVIOR_TYPES.STAND,
			direction,
			time,
		});

		const completeHandler = (e: CustomEvent<{ whoId: string }>) => {
			if (e.detail.whoId !== who.id) return;

			document.removeEventListener(CUSTOM_EVENTS.STAND, completeHandler);
			resolve();
		};

		document.addEventListener(CUSTOM_EVENTS.STAND, completeHandler);
	}

	walk(resolve: () => void) {
		const { direction } = this.event as WalkEvent;

		if (!direction) {
			throw new Error('Walk event is missing direction');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
			type: BEHAVIOR_TYPES.WALK,
			direction,
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
		const { text, faceHero } = this.event as TextMessageEvent;

		if (!text) {
			throw new Error('Text message event is missing text');
		}

		if (faceHero) {
			const hero = this.overworld.heroRef;
			const who = this.overworld.placements.find(p => {
				return p.id === faceHero;
			}) as NPCPlacement;

			if (who && hero) {
				who.movingPixelDirection = oppositeDirection(hero.movingPixelDirection);
				who.updateSprite();
			}
		}

		this.overworld.message = new Message({
			text,
			onComplete: () => resolve(),
			overworld: this.overworld,
		});
	}

	changeMap(resolve: () => void) {
		const { map } = this.event as MapChangeEvent;

		this.overworld.sceneTransition = new SceneTransition({
			overworld: this.overworld,
			callback: () => {
				this.overworld.id = map;
				this.overworld.destroy();
				this.overworld.start();
				resolve();

				this.overworld.sceneTransition?.fadeOut();
			},
		});

		this.overworld.sceneTransition.init();
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
				case BEHAVIOR_TYPES.MAP_CHANGE:
					return this.changeMap(resolve);
				default:
					return resolve();
			}
		});
	}
}
