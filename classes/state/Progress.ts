import { playerState } from '@/classes/state/PlayerState';
import { DIRECTIONS } from '@/utils/consts';

type GameState = {
	mapId: MapName;
	startingHeroX: number;
	startingHeroY: number;
	startingHeroDirection: Direction;
	playerState: {
		party: CombatantConfig[];
		lineup: string[];
		inventory: PlayerItem[];
		storyFlags: Partial<Record<StoryFlag, boolean>>;
	};
};

export class Progress {
	private readonly saveKey = 'PizzaLegends_SaveFile1';

	mapId: MapName;
	startingHeroX: number;
	startingHeroY: number;
	startingHeroDirection: Direction;

	constructor() {
		this.mapId = 'DemoRoom';
		this.startingHeroX = 0;
		this.startingHeroY = 0;
		this.startingHeroDirection = DIRECTIONS.DOWN;
	}

	save() {
		const gameState = {
			mapId: this.mapId,
			startingHeroX: this.startingHeroX,
			startingHeroY: this.startingHeroY,
			startingHeroDirection: this.startingHeroDirection,
			playerState: {
				party: playerState.party,
				lineup: playerState.lineup,
				inventory: playerState.inventory,
				storyFlags: playerState.storyFlags,
			},
		};

		window.localStorage.setItem(this.saveKey, JSON.stringify(gameState));
	}

	getSaveFile(): GameState | null {
		const gameState = window.localStorage.getItem(this.saveKey);

		return gameState ? (JSON.parse(gameState) as GameState) : null;
	}

	load() {
		const file = this.getSaveFile();

		if (!file) return;

		this.mapId = file.mapId;
		this.startingHeroX = file.startingHeroX;
		this.startingHeroY = file.startingHeroY;
		this.startingHeroDirection = file.startingHeroDirection;

		// playerState.party = file.playerState.party;
		// playerState.lineup = file.playerState.lineup;
		// playerState.inventory = file.playerState.inventory;
		// playerState.storyFlags = file.playerState.storyFlags;
    Object.assign(playerState, file.playerState);
	}
}
