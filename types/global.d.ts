import {
	SKINS,
	DIRECTIONS,
	MAPS,
	PLACEMENT_TYPES,
	BEHAVIOR_TYPES,
} from '@/utils/consts';
import type { Placement } from '@/classes/Placement';

declare global {
	// Utilities
	type ValueOf<T> = T[keyof T];

	type Skin = ValueOf<typeof SKINS>;
	type Direction = ValueOf<typeof DIRECTIONS>;

	// Maps
	type MapName = keyof typeof MAPS;
	type MapSrc = ValueOf<typeof MAPS>;

	// Placements
	type PlacementType = keyof typeof PLACEMENT_TYPES;

	type PlacementConfig = {
		x: number;
		y: number;
		skin: Skin;
		direction?: Direction;
		type?: PlacementType;
	};

	// Overworld Stuff
	type OverworldConfig = {
		map: MapSrc;
		placements: {
			[key: string]: PlacementConfig;
		};
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

	type BehaviorEvent = {
		type: BehaviorType;
		direction: Direction;
	};
}

export {};
