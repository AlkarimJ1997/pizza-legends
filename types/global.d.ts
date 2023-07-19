import { SKINS, DIRECTIONS, MAPS } from '@/utils/consts';

declare global {
	// Utilities
	type ValueOf<T> = T[keyof T];

	type Skin = ValueOf<typeof SKINS>;
	type Direction = ValueOf<typeof DIRECTIONS>;

	// Maps
	type MapName = keyof typeof MAPS;
	type MapSrc = ValueOf<typeof MAPS>;

	// Placements
	type Placement = {
		id: number;
		x: number;
		y: number;
		skin: Skin;
		direction: Direction;
	};

	// Level Stuff
	type Level = {
		map: MapSrc;
		placements: Placement[];
	};
}

export {};
