import type { Battle } from '@/classes/battle/Battle';
import type { Combatant } from '@/classes/battle/Combatant';
import { BATTLE_EVENTS, EVENTS, TEAMS } from '@/utils/consts';

type EventHandlingConfig = {
	events: BattleAction[];
	submission: Submission;
	caster: Combatant;
};

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

		// Swapping
		if ('replacement' in submission) {
			await this.onNewEvent({
				type: BATTLE_EVENTS.SWAP,
				replacement: submission.replacement,
			});

			await this.onNewEvent({
				type: EVENTS.MESSAGE,
				text: `Go get 'em, ${submission.replacement.config.name}!`,
			});

			this.nextTurn();
			return;
		}

		// Item deletion
		this.handleItemUsage(submission.instanceId);

		const resultingEvents = caster.getReplacedEvents(submission.action.success);
		await this.handleEvents({
			events: resultingEvents,
			submission,
			caster,
		});

		// Did the target die?
		const targetDead = submission.target.hp <= 0;
		if (targetDead) {
			await this.onNewEvent({
				type: EVENTS.MESSAGE,
				text: `${submission.target.config.name} fainted!`,
			});
		}

		// Do we have a winning team?
		const winner = this.getWinningTeam();
		if (winner) {
			await this.onNewEvent({
				type: EVENTS.MESSAGE,
				text: `${winner} won the battle!`,
			});
			// TODO: END THE BATTLE
			return;
		}

		// We have a dead target, but no winner, so bring in a replacement
		if (targetDead) {
			const replacement = await this.onNewEvent({
				type: BATTLE_EVENTS.REPLACEMENT_MENU,
				team: submission.target.team,
			});

			await this.onNewEvent({
				type: BATTLE_EVENTS.SWAP,
				replacement,
			});

			await this.onNewEvent({
				type: EVENTS.MESSAGE,
				text: `Go get 'em, ${replacement.config.name}!`,
			});

			this.nextTurn();
			return;
		}

		// Check for post events (i.e. status effects)
		const postEvents = caster.getPostEvents();
		await this.handleEvents({
			events: postEvents,
			submission,
			caster,
		});

		// Check for status expiration
		const expiredEvent = caster.decrementStatus();
		expiredEvent && (await this.onNewEvent(expiredEvent));

		this.nextTurn();
	}

	nextTurn() {
		this.currentTeam = this.targetTeam;
		this.turn();
	}

	getWinningTeam() {
		let aliveTeams: Partial<Record<keyof typeof TEAMS, boolean>> = {};

		for (const combatant of this.battle.combatants) {
			if (combatant.hp > 0) {
				aliveTeams[combatant.team] = true;
			}
		}

		if (!aliveTeams[TEAMS.PLAYER]) return TEAMS.ENEMY;
		if (!aliveTeams[TEAMS.ENEMY]) return TEAMS.PLAYER;
    
    return null;
	}

	handleItemUsage(instanceId: string | null) {
		if (!instanceId) return;

		this.battle.items = this.battle.items.filter(i => {
			return i.instanceId !== instanceId;
		});
	}

	async handleEvents(config: EventHandlingConfig) {
		const { events, submission, caster } = config;

		for (const event of events) {
			const eventConfig = {
				...event,
				submission,
				caster,
			};

			await this.onNewEvent(eventConfig as BattleAction);
		}
	}

	async init() {
		// await this.onNewEvent({
		// 	type: EVENTS.MESSAGE,
		// 	text: 'Trainer wants to battle!',
		// });

		this.turn();
	}
}
