import {
	SKINS,
	DIRECTIONS,
	MAPS,
	PLACEMENT_TYPES,
	EVENTS,
	SHADOW,
	STATUSES,
	PIZZA_TYPES,
	PIZZA_SKINS,
	PIZZA_ICONS,
	TEAMS,
	ANIMATIONS,
	MOVE_TYPES,
} from '@/utils/consts';
import type { Placement } from '@/classes/placements/Placement';
import type { Message } from '@/classes/Message';
import type { SceneTransition } from '@/classes/SceneTransition';
import type { Combatant } from '@/classes/battle/Combatant';
import type { Battle } from '@/classes/battle/Battle';
import { MoveName } from '@/data/MoveMap';

declare global {
	// Utilities
	type ValueOf<T> = T[keyof T];

	type Skin = ValueOf<typeof SKINS> | typeof SHADOW;
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

	type PlacementConfig = PersonConfig;

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

	type AnimationMap = {
		[key in WalkAnimationName]: [number, number][];
	};

	// Story Flag events (Talking or Cutscene Spaces)
	type StoryConfig = {
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
	};

	type BehaviorEvent = { who?: string } & (
		| WalkEvent
		| StandEvent
		| TextMessageEvent
		| MapChangeEvent
		| BattleStartEvent
	);

	// Revealing Text
	type RevealingCharacter = {
		char: string;
		delayAfter: number;
		show: boolean;
	};

	// Battle
	type CombatantConfig = PizzaConfig & {
		id: string;
		belongsToTeam: keyof typeof TEAMS;
		hp: number;
		maxHp: number;
		xp: number;
		maxXp: number;
		level: number;
		status?: {
			type: keyof typeof STATUSES;
			expiresIn: number;
		} | null;
	};

	type PizzaConfig = {
		name: string;
		type: keyof typeof PIZZA_TYPES;
		src: ValueOf<typeof PIZZA_SKINS>;
		icon: ValueOf<typeof PIZZA_ICONS>;
		moves: MoveName[];
	};

	type MoveConfig = {
		name: string;
		targetType?: keyof typeof MOVE_TYPES;
		success: BattleAction[];
	};

	// Battle Events
	type Submission = {
		move: MoveConfig;
		target: Combatant;
	};

	type BattleMessageEvent = TextMessageEvent & {
		submission?: Submission;
		caster?: Combatant;
	};

	type SubmissionMenuEvent = {
		type: 'SUBMISSION_MENU';
		caster: Combatant;
		target: Combatant;
	};

	type StateChangeEvent = {
		type: 'STATE_CHANGE';
		damage?: number;
		recovery?: number;
		status?: {
			type: keyof typeof STATUSES;
			expiresIn: number;
		} | null;
		onCaster?: boolean;
	} & { submission?: Submission; caster?: Combatant };

	type BattleAnimationName = keyof typeof ANIMATIONS;
	type BattleAnimationEvent = {
		type: 'ANIMATION';
		animation: BattleAnimationName;
	} & { submission?: Submission; caster?: Combatant };

	type BattleAction =
		| BattleMessageEvent
		| SubmissionMenuEvent
		| StateChangeEvent
		| BattleAnimationEvent;

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
