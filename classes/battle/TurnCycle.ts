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
