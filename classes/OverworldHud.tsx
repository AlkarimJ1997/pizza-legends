import { playerState } from '@/classes/state/PlayerState';

export class OverworldHud {
	playerState: typeof playerState;

	constructor() {
		this.playerState = playerState;
	}
}
