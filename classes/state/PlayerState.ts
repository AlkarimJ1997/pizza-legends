import type { Combatant } from '@/classes/battle/Combatant';
import Pizzas from '@/data/PizzaMap';
import { TEAMS } from '@/utils/consts';

class PlayerState {
	party: CombatantConfig[] = [];
	lineup: string[] = [];
	inventory: PlayerItem[] = [];

	constructor() {
		this.party = [
			{
				...Pizzas.s001,
				id: 'p1',
				belongsToTeam: TEAMS.PLAYER,
				hp: 30,
				maxHp: 50,
				xp: 90,
				maxXp: 100,
				level: 1,
			},
			{
				...Pizzas.v001,
				id: 'p2',
				belongsToTeam: TEAMS.PLAYER,
				hp: 50,
				maxHp: 50,
				xp: 75,
				maxXp: 100,
				level: 1,
			},
		];

		this.lineup = ['p1', 'p2'];
		this.inventory = [
			{ actionId: 'item_recoverHp', instanceId: 'item1' },
		];
	}
}

export const playerState = new PlayerState();