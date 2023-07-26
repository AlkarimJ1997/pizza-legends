import { DirectionControls } from '@/classes/DirectionControls';
import { placementFactory } from '@/classes/PlacementFactory';
import { GameLoop } from '@/classes/GameLoop';
import { BEHAVIOR_TYPES, MAPS } from '@/utils/consts';
import type { Placement } from '@/classes/placements/Placement';
import type { HeroPlacement } from '@/classes/placements/HeroPlacement';
import OverworldMaps from '@/data/OverworldStateMap';
import { Camera } from '@/classes/Camera';
import { OverworldEvent } from '@/classes/OverworldEvent';

export class OverworldState {
	id: MapName;
	onEmit: (newState: OverworldChanges) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];
	isCutscenePlaying: boolean = false;

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

		this.map = overworldData.map;
		this.placements = overworldData.placements.map(config => {
			return placementFactory.createPlacement(config, this);
		});

		this.heroRef = this.placements.find(p => p.id === 'hero') as HeroPlacement;
		this.camera = new Camera(this, this.heroRef);

		this.startGameLoop();
		this.startCutscene([
      { type: BEHAVIOR_TYPES.MESSAGE, text: 'Hello World' },
			// { type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.DOWN, who: 'hero' },
			// { type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.DOWN, who: 'hero' },
			// { type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.UP, who: 'npcA' },
			// { type: BEHAVIOR_TYPES.WALK, direction: DIRECTIONS.LEFT, who: 'npcA' },
			// {
			// 	type: BEHAVIOR_TYPES.STAND,
			// 	direction: DIRECTIONS.RIGHT,
			// 	time: 300,
			// 	who: 'hero',
			// },
		]);
	}

	startGameLoop() {
		this.gameLoop?.stop();

		this.gameLoop = new GameLoop(() => {
			this.tick();
		});
	}

	async startCutscene(events: BehaviorEvent[]) {
		this.isCutscenePlaying = true;

		// Start a loop of async events and await each one
		for (const event of events) {
			const eventHandler = new OverworldEvent({
				overworld: this,
				event,
			});

			await eventHandler.init();
		}

		this.isCutscenePlaying = false;
	}

	isPositionOccupied(nextPosition: { x: number; y: number }) {
		const { x, y } = nextPosition;

		// Check for other placements
		return this.placements.find(p => {
			if (p.x === x && p.y === y) return true;
			if (p.intentPosition?.x === x && p.intentPosition?.y === y) {
				return true;
			}

			return false;
		});
	}

	addPlacement(config: PlacementConfig) {
		this.placements.push(placementFactory.createPlacement(config, this));
	}

	deletePlacement(placementToRemove: Placement) {
		this.placements = this.placements.filter(p => {
			return p.id !== placementToRemove.id;
		});
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
