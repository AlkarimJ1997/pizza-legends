import OverworldMaps from '@/data/OverworldStateMap';
import { DIRECTIONS, MAPS, SKINS } from '@/utils/consts';

export class OverworldState {
	id: MapName;
	onEmit: (newState: Overworld) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];

	constructor(mapId: MapName, onEmit: (newState: Overworld) => void) {
		this.id = mapId;
		this.onEmit = onEmit;
		this.start();
	}

	start() {
		const overworldData = OverworldMaps[this.id]!;

		this.map = overworldData.map;
		this.placements = overworldData.placements;
	}

	getState() {
		return {
			map: this.map,
			placements: this.placements,
		};
	}

	destroy() {
		// TODO ~ tear down the map
	}
}
