import {
	SKINS,
	DIRECTIONS,
	MAPS,
	PLACEMENT_TYPES,
	BEHAVIOR_TYPES,
	SHADOW,
} from '@/utils/consts';
import type { Placement } from '@/classes/placements/Placement';

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
	};

	type WallConfig = {
		x: number;
		y: number;
		type: 'WALL';
	};

	type MessageConfig = {
		text: string;
		type: 'MESSAGE';
	};

	type PlacementConfig = PersonConfig | WallConfig | MessageConfig;

	// Overworld Stuff
	type OverworldConfig = {
		map: MapSrc;
		placements: PlacementConfig[];
	};

	type OverworldChanges = {
		map: MapSrc;
		placements: Placement[];
		cameraTransformX: string;
		cameraTransformY: string;
	};

	// Animation
	type AnimationName =
		| 'idle-up'
		| 'idle-down'
		| 'idle-left'
		| 'idle-right'
		| 'walk-up'
		| 'walk-down'
		| 'walk-left'
		| 'walk-right';

	type AnimationMap = {
		[key in AnimationName]: [number, number][];
	};

	// Behavior Events
	type BehaviorType = keyof typeof BEHAVIOR_TYPES;

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

	type MessageEvent = {
		type: 'MESSAGE';
		text: string;
	};

	type BehaviorEvent = { who?: string } & (
		| WalkEvent
		| StandEvent
		| MessageEvent
	);

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
