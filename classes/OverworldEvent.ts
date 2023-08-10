import { Message } from '@/classes/Message';
import type { OverworldState } from '@/classes/OverworldState';
import { SceneTransition } from '@/classes/SceneTransition';
import { Battle } from '@/classes/battle/Battle';
import type { NPCPlacement } from '@/classes/placements/NPCPlacement';
import { PersonPlacement } from '@/classes/placements/PersonPlacement';
import Trainers from '@/data/TrainerMap';
import { EVENTS, CUSTOM_EVENTS } from '@/utils/consts';
import { oppositeDirection } from '@/utils/helpers';
import { PauseMenu } from '@/classes/menus/PauseMenu';
import { playerState } from '@/classes/state/PlayerState';
import { CraftingMenu } from '@/classes/menus/CraftingMenu';

type ResolveFn = (value: void | 'WON_BATTLE' | 'LOST_BATTLE') => void;

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

	stand(resolve: ResolveFn) {
		const { direction, time } = this.event as StandEvent;

		if (!direction || !time) {
			throw new Error('Stand event is missing direction or time');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
			type: EVENTS.STAND,
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

	walk(resolve: ResolveFn) {
		const { direction } = this.event as WalkEvent;

		if (!direction) {
			throw new Error('Walk event is missing direction');
		}

		const who = this.overworld.placements.find(p => {
			return p.id === this.event.who;
		}) as PersonPlacement | undefined;

		if (!who) return resolve();

		who.startBehavior({
			type: EVENTS.WALK,
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

	textMessage(resolve: ResolveFn) {
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

	changeMap(resolve: ResolveFn) {
		const { map, x, y, direction } = this.event as MapChangeEvent;

		this.overworld.sceneTransition = new SceneTransition({
			overworld: this.overworld,
			callback: () => {
				this.overworld.loadMap(map, { x, y, direction });
				resolve();

				this.overworld.sceneTransition?.fadeOut();
			},
		});

		this.overworld.sceneTransition.init();
	}

	battle(resolve: ResolveFn) {
		const { trainerId } = this.event as BattleStartEvent;

		this.overworld.sceneTransition = new SceneTransition({
			overworld: this.overworld,
			callback: () => {
				this.overworld.battle = new Battle({
					trainer: Trainers[trainerId],
					overworld: this.overworld,
					onComplete: didWin => resolve(didWin ? 'WON_BATTLE' : 'LOST_BATTLE'),
				});

				this.overworld.battle.init();
				this.overworld.sceneTransition?.fadeOut();
			},
		});

		this.overworld.sceneTransition.init();
	}

	pause(resolve: () => void) {
		this.overworld.isPaused = true;
		this.overworld.overlay = new PauseMenu({
			onComplete: () => {
				resolve();
				this.overworld.overlay = null;
				this.overworld.isPaused = false;
			},
		});

		this.overworld.overlay.init();
	}

	storyFlag(resolve: ResolveFn) {
		const { flag } = this.event as StoryFlagEvent;

		playerState.storyFlags[flag] = true;
		resolve();
	}

	crafting(resolve: ResolveFn) {
		const { pizzas } = this.event as CraftingEvent;

		this.overworld.overlay = new CraftingMenu({
			pizzas,
			onComplete: () => {
				resolve();
				this.overworld.overlay = null;
			},
		});

		this.overworld.overlay.init();
	}

	init() {
		return new Promise((resolve: ResolveFn) => {
			switch (this.event.type) {
				case EVENTS.STAND:
					return this.stand(resolve);
				case EVENTS.WALK:
					return this.walk(resolve);
				case EVENTS.MESSAGE:
					return this.textMessage(resolve);
				case EVENTS.MAP_CHANGE:
					return this.changeMap(resolve);
				case EVENTS.BATTLE:
					return this.battle(resolve);
				case EVENTS.PAUSE:
					return this.pause(resolve);
				case EVENTS.STORY_FLAG:
					return this.storyFlag(resolve);
				case EVENTS.CRAFTING:
					return this.crafting(resolve);
				default:
					return resolve();
			}
		});
	}
}
