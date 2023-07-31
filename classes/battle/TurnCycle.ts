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

		if (!caster || !target) {
			throw new Error('Caster or target not found');
		}

		const submission = await this.onNewEvent({
			type: BATTLE_EVENTS.SUBMISSION_MENU,
			caster,
			target,
			battle: this.battle,
		});

		if (!submission) {
			throw new Error('Submission not found');
		}

		const resultingEvents = caster.getReplacedEvents(submission.move.success);

		for (const event of resultingEvents) {
			const eventConfig = {
				...event,
				submission,
				caster,
			};

			await this.onNewEvent(eventConfig);
		}

		// Check for post events (i.e. status effects)
		const postEvents = caster.getPostEvents();

		for (const event of postEvents) {
			const eventConfig = {
				...event,
				submission,
				caster,
			};

			await this.onNewEvent(eventConfig);
		}

		// Check for status expiration
		const expiredEvent = caster.decrementStatus();
		expiredEvent && (await this.onNewEvent(expiredEvent));

		this.currentTeam = this.targetTeam;
		this.turn();
	}

	async init() {
		// await this.onNewEvent({
		// 	type: EVENTS.MESSAGE,
		// 	text: 'Trainer wants to battle!',
		// });

		this.turn();
	}
}
