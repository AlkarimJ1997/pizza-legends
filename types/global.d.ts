import {
	SKINS,
	DIRECTIONS,
	MAPS,
	PLACEMENT_TYPES,
	EVENTS,
	SHADOW,
	STORY_FLAGS,
	PIZZA_STONE,
} from '@/utils/consts';
import type { Placement } from '@/classes/placements/Placement';
import type { Message } from '@/classes/Message';
import type { SceneTransition } from '@/classes/SceneTransition';
import type { Combatant } from '@/classes/battle/Combatant';
import type { Battle } from '@/classes/battle/Battle';
import type { OverworldHud } from '@/classes/OverworldHud';
import type { Pause } from '@/classes/Pause';

declare global {
	// Utilities
	type ValueOf<T> = T[keyof T];

	type Skin = ValueOf<typeof SKINS> | typeof SHADOW | typeof PIZZA_STONE;
	type Direction = ValueOf<typeof DIRECTIONS>;

	// Maps
	type MapName = keyof typeof MAPS;
	type MapSrc = ValueOf<typeof MAPS>;

	// Placements
	type PlacementType = keyof typeof PLACEMENT_TYPES;

	type PersonConfig = {
		id: string;
		x: number;
		y: number;
		skin: Skin;
		type: 'HERO' | 'NPC';
		direction?: Direction;
		behaviorLoop?: BehaviorEvent[];
		talking?: StoryConfig[];
	};

	type PizzaStoneConfig = {
		x: number;
		y: number;
		type: 'PIZZA_STONE';
	};

	type PlacementConfig = PersonConfig | PizzaStoneConfig;

	// Overworld Stuff
	type OverworldConfig = {
		map: MapSrc;
		placements: PlacementConfig[];
		walls?: string[];
		cutsceneSpaces?: {
			[key: string]: StoryConfig[];
		};
	};

	type OverworldChanges = {
		id: MapName;
		map: MapSrc;
		placements: Placement[];
		cameraTransformX: string;
		cameraTransformY: string;
		message: Message | null;
		sceneTransition: SceneTransition | null;
		battle: Battle | null;
		hud: OverworldHud | null;
		pause: Pause | null;
	};

	// Animation
	type WalkAnimationName =
		| 'idle-up'
		| 'idle-down'
		| 'idle-left'
		| 'idle-right'
		| 'walk-up'
		| 'walk-down'
		| 'walk-left'
		| 'walk-right';

	type StoneAnimationName = 'used-down' | 'unused-down';
	type SpriteAnimationName = WalkAnimationName | StoneAnimationName;

	type AnimationMap = {
		[key in WalkAnimationName | StoneAnimationName]: [number, number][];
	};

	// Story Flag events (Talking or Cutscene Spaces)
	type StoryConfig = {
		required?: StoryFlag[];
		events: BehaviorEvent[];
	};

	// Behavior Events
	type BehaviorType = keyof typeof EVENTS;

	type WalkEvent = {
		type: 'WALK';
		direction: Direction;
		retry?: boolean;
	};

	type StandEvent = {
		type: 'STAND';
		direction: Direction;
		time: number;
	};

	type TextMessageEvent = {
		type: 'MESSAGE';
		text: string;
		faceHero?: string;
	};

	type MapChangeEvent = {
		type: 'MAP_CHANGE';
		map: MapName;
	};

	type BattleStartEvent = {
		type: 'BATTLE';
		trainerId: TrainerId;
	};

	type PauseEvent = { type: 'PAUSE' };

	type StoryFlagEvent = {
		type: 'STORY_FLAG';
		flag: StoryFlag;
	};

	type BehaviorEvent = { who?: string } & (
		| WalkEvent
		| StandEvent
		| TextMessageEvent
		| MapChangeEvent
		| BattleStartEvent
		| PauseEvent
		| StoryFlagEvent
	);

	// Revealing Text
	type RevealingCharacter = {
		char: string;
		delayAfter: number;
		show: boolean;
	};

	// Keyboard Menu stuff
	type PageOption = {
		label: string;
		description: string;
		disabled?: boolean;
		handler: () => void;
		right?: () => string;
	};

	// Story Progress
	type StoryFlag = keyof typeof STORY_FLAGS;

	// Custom Events
	type CustomEventMap = {
		PersonWalkingComplete: CustomEvent<{ whoId: string }>;
		PersonStandingComplete: CustomEvent<{ whoId: string }>;
	};

	interface Document {
		addEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		removeEventListener<K extends keyof CustomEventMap>(
			type: K,
			listener: (this: Document, ev: CustomEventMap[K]) => void
		): void;
		dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
	}
}

export {};
