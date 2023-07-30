import type { Battle } from '@/classes/battle/Battle';
import { BATTLE_EVENTS, EVENTS, TEAMS } from '@/utils/consts';

interface TurnCycleProps {
	battle: Battle;
	onNewEvent: (event: BattleAction) => Promise<void | Submission>;
}

export class TurnCycle {
	battle: Battle;
	onNewEvent: (event: BattleAction) => Promise<void | Submission>;
	currentTeam: keyof typeof TEAMS;

	constructor({ battle, onNewEvent }: TurnCycleProps) {
		this.battle = battle;
		this.onNewEvent = onNewEvent;
		this.currentTeam = TEAMS.PLAYER;
	}

	get targetTeam() {
		return this.currentTeam === TEAMS.PLAYER ? TEAMS.ENEMY : TEAMS.PLAYER;
	}

	async turn() {
		const casterId = this.battle.activeCombatants[this.currentTeam];
		const caster = this.battle.combatants.find(c => c.config.id === casterId);

		const targetId = this.battle.activeCombatants[this.targetTeam];
		const target = this.battle.combatants.find(c => c.config.id === targetId);

		const submission = await this.onNewEvent({
			type: BATTLE_EVENTS.SUBMISSION_MENU,
			caster,
			target,
		});

		console.log(submission);
	}

	async init() {
		await this.onNewEvent({
			type: EVENTS.MESSAGE,
			text: 'Trainer wants to battle!',
		});

		this.turn();
	}
}
