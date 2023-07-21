import { DirectionControls } from '@/classes/DirectionControls';
import { placementFactory } from '@/classes/PlacementFactory';
import { GameLoop } from '@/classes/GameLoop';
import { MAPS, PLACEMENT_TYPES } from '@/utils/consts';
import type { Placement } from '@/classes/Placement';
import type { HeroPlacement } from '@/classes/HeroPlacement';
import OverworldMaps from '@/data/OverworldStateMap';

export class OverworldState {
	id: MapName;
	onEmit: (newState: Overworld) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];

	heroRef: HeroPlacement | undefined;

	directionControls: DirectionControls;
	gameLoop: GameLoop | null = null;

	constructor(mapId: MapName, onEmit: (newState: Overworld) => void) {
		this.id = mapId;
		this.onEmit = onEmit;
		this.directionControls = new DirectionControls();

		this.start();
	}

	start() {
		const overworldData = OverworldMaps[this.id]!;

		this.map = overworldData.map;
		this.placements = overworldData.placements.map(config => {
			return placementFactory.createPlacement(config, this);
		});

		this.heroRef = this.placements.find(
			p => p.type === PLACEMENT_TYPES.HERO
		) as HeroPlacement;

		this.startGameLoop();
	}

	startGameLoop() {
		this.gameLoop?.stop();

		this.gameLoop = new GameLoop(() => {
			this.tick();
		});
	}

	tick() {
		// Check for movement
		if (this.directionControls.direction) {
			this.heroRef?.controllerMoveRequested(this.directionControls.direction);
		}

		this.placements.forEach(placement => placement.tick());
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
