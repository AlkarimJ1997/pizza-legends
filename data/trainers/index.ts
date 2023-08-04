import { SKINS } from '@/utils/consts';

export const erio: TrainerConfig = {
	name: 'Erio',
	src: SKINS.ERIO,
	pizzas: [
		{ pizzaId: 's001', maxHp: 50, level: 1 },
		{ pizzaId: 's002', maxHp: 50, level: 1 },
	],
};

export const beth: TrainerConfig = {
	name: 'Beth',
	src: SKINS.NPC1,
	pizzas: [{ pizzaId: 'f001', hp: 1, maxHp: 50, level: 1 }],
};
