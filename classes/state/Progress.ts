import type { OverworldState } from '@/classes/OverworldState';
import { playerState } from '@/classes/state/PlayerState';
import { DIRECTIONS } from '@/utils/consts';
import { getFromLocalStorage } from '@/utils/helpers';

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

	overworld: OverworldState;
	startingHeroX: number | null = null;
	startingHeroY: number | null = null;
	startingHeroDirection: Direction | null = null;

	constructor({ overworld }: { overworld: OverworldState }) {
		this.overworld = overworld;
	}

	save() {
		if (!this.overworld.heroRef) {
			throw new Error('Cannot save without a hero');
		}

		const gameState = {
			mapId: this.overworld.id,
			startingHeroX: this.overworld.heroRef.x,
			startingHeroY: this.overworld.heroRef.y,
			startingHeroDirection: this.overworld.heroRef.movingPixelDirection,
			playerState: {
				party: playerState.party,
				lineup: playerState.lineup,
				inventory: playerState.inventory,
				storyFlags: playerState.storyFlags,
			},
		};

		window.localStorage.setItem(this.saveKey, JSON.stringify(gameState));
	}

	updateHeroPosition() {
		if (!this.overworld.heroRef) {
			throw new Error("Can't find hero instance");
		}

		const { heroRef } = this.overworld;

		if (
			!this.startingHeroX ||
			!this.startingHeroY ||
			!this.startingHeroDirection
		) {
			return;
		}

		heroRef.x = this.startingHeroX;
		heroRef.y = this.startingHeroY;
		heroRef.movingPixelDirection = this.startingHeroDirection;
	}

	load() {
		const file = getFromLocalStorage<GameState>(this.saveKey);

		if (!file) {
			console.log('No save file found');
			return;
		}

		this.overworld.id = file.mapId;
		this.startingHeroX = file.startingHeroX;
		this.startingHeroY = file.startingHeroY;
		this.startingHeroDirection = file.startingHeroDirection;
		Object.assign(playerState, file.playerState);
	}
}
