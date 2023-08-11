import { TEAMS } from '@/utils/consts';
import { v4 as uuid } from 'uuid';
import Pizzas from '@/data/PizzaMap';

class PlayerState {
	party: CombatantConfig[] = [];
	lineup: string[] = [];
	inventory: PlayerItem[] = [];
	storyFlags: Partial<Record<StoryFlag, boolean>> = {};

	constructor() {
		this.party = [
			{
				...Pizzas.s001,
				id: 'p1',
				belongsToTeam: TEAMS.PLAYER,
				hp: 50,
				maxHp: 50,
				xp: 0,
				maxXp: 100,
				level: 1,
			},
		];

		this.lineup = ['p1'];
		this.inventory = [
			{ actionId: 'item_recoverHp', instanceId: 'item1' },
			{ actionId: 'item_recoverHp', instanceId: 'item1' },
			{ actionId: 'item_recoverHp', instanceId: 'item1' },
		];
	}

	addMember(id: keyof typeof Pizzas) {
		const pizza = Pizzas[id];
		const newId = uuid();

		this.party.push({
			...pizza,
			id: newId,
			belongsToTeam: TEAMS.PLAYER,
			hp: 50,
			maxHp: 50,
			xp: 0,
			maxXp: 100,
			level: 1,
		});

		// Add pizza to lineup if there's room
		this.lineup.length < 3 && this.lineup.push(newId);
	}

	swapLineup(oldId: string, incomingId: string) {
		const oldIndex = this.lineup.indexOf(oldId);

		this.lineup[oldIndex] = incomingId;
	}

	moveToFront(id: string) {
		this.lineup = this.lineup.filter(i => i !== id);
		this.lineup.unshift(id);
	}
}

export const playerState = new PlayerState();
