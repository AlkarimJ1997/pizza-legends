import { GameLoop } from '@/classes/GameLoop';
import { MAPS } from '@/utils/consts';
import OverworldMaps from '@/data/OverworldStateMap';

export class OverworldState {
	id: MapName;
	onEmit: (newState: Overworld) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];

	gameLoop: GameLoop | null = null;

	constructor(mapId: MapName, onEmit: (newState: Overworld) => void) {
		this.id = mapId;
		this.onEmit = onEmit;
		this.start();
	}

	start() {
		const overworldData = OverworldMaps[this.id]!;

		this.map = overworldData.map;
		this.placements = overworldData.placements;

		this.startGameLoop();
	}

	startGameLoop() {
		this.gameLoop?.stop();

		this.gameLoop = new GameLoop(() => {
			this.tick();
		});
	}

	tick() {
		// this.placements.forEach(placement => placement.tick());
		this.onEmit(this.getState()); // Emit any changes to React
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
