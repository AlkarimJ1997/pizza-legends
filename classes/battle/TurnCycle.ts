import type { Battle } from '@/classes/battle/Battle';
import { EVENTS, TEAMS } from '@/utils/consts';

interface TurnCycleProps {
	battle: Battle;
	onNewEvent: (event: BattleAction) => Promise<void>;
}

export class TurnCycle {
	battle: Battle;
	onNewEvent: (event: BattleAction) => Promise<void>;
	currentTeam: keyof typeof TEAMS;

	constructor({ battle, onNewEvent }: TurnCycleProps) {
		this.battle = battle;
		this.onNewEvent = onNewEvent;
		this.currentTeam = TEAMS.PLAYER;
	}

	async turn() {}

	async init() {
		await this.onNewEvent({
			type: EVENTS.MESSAGE,
			text: 'Trainer wants to battle!',
		});

		this.turn();
	}
}
