import { DirectionControls } from '@/classes/DirectionControls';
import { placementFactory } from '@/classes/PlacementFactory';
import { GameLoop } from '@/classes/GameLoop';
import { EVENTS, CUSTOM_EVENTS, DIRECTIONS, MAPS } from '@/utils/consts';
import type { Placement } from '@/classes/placements/Placement';
import type { HeroPlacement } from '@/classes/placements/HeroPlacement';
import type { Message } from '@/classes/Message';
import OverworldMaps from '@/data/OverworldStateMap';
import { Camera } from '@/classes/Camera';
import { OverworldEvent } from '@/classes/OverworldEvent';
import { KeyPressListener } from '@/classes/KeyPressListener';
import { getNextCoords } from '@/utils/helpers';
import { SceneTransition } from '@/classes/SceneTransition';

export class OverworldState {
	id: MapName;
	onEmit: (newState: OverworldChanges) => void;
	map: MapSrc = MAPS.DemoRoom;
	placements: Placement[] = [];
	walls: string[] = [];
	cutsceneSpaces: { [key: string]: StoryConfig[] } = {};

	isCutscenePlaying: boolean = false;
	heroRef: HeroPlacement | undefined;

	directionControls: DirectionControls | null = null;
	camera: Camera | null = null;
	gameLoop: GameLoop | null = null;

	message: Message | null = null;
	sceneTransition: SceneTransition | null = null;

	constructor(mapId: MapName, onEmit: (newState: OverworldChanges) => void) {
		this.id = mapId;
		this.onEmit = onEmit;

		this.start();
	}

	start() {
		const overworldData = OverworldMaps[this.id]!;

		this.map = overworldData.map;
		this.placements = overworldData.placements.map(config => {
			return placementFactory.createPlacement(config, this);
		});
		this.walls = overworldData.walls || [];
		this.cutsceneSpaces = overworldData.cutsceneSpaces || {};

		this.heroRef = this.placements.find(p => p.id === 'hero') as HeroPlacement;
		this.camera = new Camera(this, this.heroRef);
		this.directionControls = new DirectionControls();

		this.bindActionInput();
		this.bindHeroPositionCheck();

		this.startGameLoop();
		// this.startCutscene([
		// 	{ type: EVENTS.MESSAGE, text: 'This is the very first message!' },
		// ]);
	}

	bindActionInput() {
		new KeyPressListener('Enter', () => {
			// Is there a person here to talk to?
			if (!this.heroRef) return;

			const { x, y, movingPixelDirection: direction } = this.heroRef;
			const nextCoords = getNextCoords(x, y, direction);

			const match = this.placements.find(p => {
				return p.x === nextCoords.x && p.y === nextCoords.y;
			});

			if (match && match.talking.length > 0 && !this.isCutscenePlaying) {
				this.startCutscene(match.talking[0].events);
			}
		});
	}

	bindHeroPositionCheck() {
		document.addEventListener(
			CUSTOM_EVENTS.WALK,
			(e: CustomEvent<{ whoId: string }>) => {
				if (e.detail.whoId !== 'hero' || !this.heroRef) return;

				const { x, y } = this.heroRef;
				const match = this.cutsceneSpaces[`${x},${y}`];

				if (!match || this.isCutscenePlaying) return;

				this.heroRef.updateSprite();
				this.startCutscene(match[0].events);
			}
		);
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

		// Check for walls
		if (this.walls.includes(`${x}x${y}`)) return true;

		// Check for other placements
		return this.placements.find(p => {
			if (p.x === x && p.y === y) return true;
			if (p.intentPosition?.x === x && p.intentPosition?.y === y) {
				return true;
			}

			return false;
		});
	}

	tick() {
		// Check for movement
		if (this.directionControls?.direction) {
			this.heroRef?.controllerMoveRequested(this.directionControls.direction);
		}

		this.placements.forEach(placement => placement.tick());
		this.camera?.tick();
		this.onEmit(this.getState()); // Emit any changes to React
	}

	getState() {
		return {
      id: this.id,
			map: this.map,
			placements: this.placements,
			cameraTransformX: this.camera?.transformX ?? '',
			cameraTransformY: this.camera?.transformY ?? '',
			message: this.message,
			sceneTransition: this.sceneTransition,
		};
	}

	destroy() {
		// TODO ~ tear down the map
		this.gameLoop?.stop();
		this.directionControls?.unbind();
	}
}
