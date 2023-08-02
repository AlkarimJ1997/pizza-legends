import {
	TEAMS,
	STATUSES,
	PIZZA_TYPES,
	PIZZA_SKINS,
	PIZZA_ICONS,
	ACTION_TYPES,
	ANIMATIONS,
} from '@/utils/consts';
import type { Battle } from '@/classes/battle/Battle';
import { ActionName } from '@/data/ActionMap';

declare global {
	type CombatantConfig = PizzaConfig & {
		id: string;
		belongsToTeam: keyof typeof TEAMS;
		hp: number;
		maxHp: number;
		xp: number;
		maxXp: number;
		level: number;
		status?: {
			type: keyof typeof STATUSES;
			expiresIn: number;
		} | null;
		isPlayerControlled?: boolean;
	};

	type PizzaConfig = {
		name: string;
		type: keyof typeof PIZZA_TYPES;
		src: ValueOf<typeof PIZZA_SKINS>;
		icon: ValueOf<typeof PIZZA_ICONS>;
		actions: ActionName[];
	};

	type ActionConfig = {
		name: string;
		description: string;
		targetType?: keyof typeof ACTION_TYPES;
		success: BattleAction[];
	};

	// Battle Events
	type Submission = {
		action: ActionConfig;
		target: Combatant;
	};

	type BattleMessageEvent = TextMessageEvent & {
		submission?: Submission;
		caster?: Combatant;
	};

	type SubmissionMenuEvent = {
		type: 'SUBMISSION_MENU';
		caster: Combatant;
		target: Combatant;
		battle: Battle;
	};

	type StateChangeEvent = {
		type: 'STATE_CHANGE';
		damage?: number;
		recovery?: number;
		status?: {
			type: keyof typeof STATUSES;
			expiresIn: number;
		} | null;
		onCaster?: boolean;
	} & { submission?: Submission; caster?: Combatant };

	type BattleAnimationName = keyof typeof ANIMATIONS;
	type BattleAnimationEvent = {
		type: 'ANIMATION';
		animation: BattleAnimationName;
		color?: string;
	} & { submission?: Submission; caster?: Combatant };

	type BattleAction =
		| BattleMessageEvent
		| SubmissionMenuEvent
		| StateChangeEvent
		| BattleAnimationEvent;

	// Battle Items
	type ItemConfig = {
		itemId: ActionName;
		instanceId: string;
		team: keyof typeof TEAMS;
	};
}

export {};
