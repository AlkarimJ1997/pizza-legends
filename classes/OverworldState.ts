import { DirectionControls } from '@/classes/DirectionControls';
import { placementFactory } from '@/classes/PlacementFactory';
import { GameLoop } from '@/classes/GameLoop';
import { MAPS, PLACEMENT_TYPES } from '@/utils/consts';
import type { Placement } from '@/classes/Placement';
import type { HeroPlacement } from '@/classes/HeroPlacement';
import OverworldMaps from '@/data/OverworldStateMap';
import { Camera } from '@/classes/Camera';
import { WALLS } from '@/utils/walls';

export class OverworldState {
	id: MapName;
	onEmit: (newState: OverworldChanges) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];

	heroRef: HeroPlacement | undefined;

	directionControls: DirectionControls;
	camera: Camera | null = null;
	gameLoop: GameLoop | null = null;

	constructor(mapId: MapName, onEmit: (newState: OverworldChanges) => void) {
		this.id = mapId;
		this.onEmit = onEmit;
		this.directionControls = new DirectionControls();

		this.start();
	}

	start() {
		const overworldData = OverworldMaps[this.id]!;
		const { map, placements } = overworldData;

		this.map = map;
		this.placements = Object.entries(placements).map(([id, config]) => {
			return placementFactory.createPlacement(id, config, this);
		});

		this.heroRef = this.placements.find(p => p.id === 'hero') as HeroPlacement;
		this.camera = new Camera(this, this.heroRef);

		this.startGameLoop();
	}

	startGameLoop() {
		this.gameLoop?.stop();

		this.gameLoop = new GameLoop(() => {
			this.tick();
		});
	}

	isPositionOutOfBounds(nextPosition: { x: number; y: number }) {
		const { x, y } = nextPosition;

		return WALLS[this.id][`${x},${y}`];
	}

	tick() {
		// Check for movement
		if (this.directionControls.direction) {
			this.heroRef?.controllerMoveRequested(this.directionControls.direction);
		}

		this.placements.forEach(placement => placement.tick());
		this.camera?.tick();
		this.onEmit(this.getState()); // Emit any changes to React
	}

	getState() {
		return {
			map: this.map,
			placements: this.placements,
			cameraTransformX: this.camera?.transformX ?? '',
			cameraTransformY: this.camera?.transformY ?? '',
		};
	}

	destroy() {
		// TODO ~ tear down the map
	}
}
