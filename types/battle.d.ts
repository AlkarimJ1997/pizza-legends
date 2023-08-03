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
import type { Combatant } from '@/classes/battle/Combatant';
import Actions, { ActionName } from '@/data/ActionMap';
import Animations from '@/data/AnimationMap';

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
		description: string;
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
	type DefaultSubmission = {
		action: ActionConfig;
		target: Combatant;
		instanceId: string | null;
	};

	type SwapSubmission = {
		replacement: Combatant;
	};

	type Submission = DefaultSubmission | SwapSubmission;

	type BattleMessageEvent = TextMessageEvent & {
		submission?: DefaultSubmission;
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
	} & { submission?: DefaultSubmission; caster?: Combatant };

	type BattleAnimationName = keyof typeof Animations;
	type BattleAnimationEvent = {
		type: 'ANIMATION';
		animation: BattleAnimationName;
		color?: string;
	} & { submission?: DefaultSubmission; caster?: Combatant };

	type PizzaSwapEvent = {
		type: 'SWAP';
		replacement: Combatant;
	};

	type BattleAction =
		| BattleMessageEvent
		| SubmissionMenuEvent
		| StateChangeEvent
		| BattleAnimationEvent
		| PizzaSwapEvent;

	// Battle Items
	type ItemConfig = {
		actionId: ActionName;
		instanceId: string;
		team: keyof typeof TEAMS;
	};

	type ActionName = keyof typeof Actions;
}

export {};
