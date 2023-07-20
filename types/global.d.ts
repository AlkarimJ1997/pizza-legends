import { SKINS, DIRECTIONS, MAPS, PLACEMENT_TYPES } from '@/utils/consts';
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
		id: number;
		x: number;
		y: number;
		skin: Skin;
		direction?: Direction;
		type?: PlacementType;
    isPlayerControlled?: boolean;
	};

	// Overworld Stuff
	type Overworld = {
		map: MapSrc;
		placements: PlacementConfig[];
	};
}

export {};
