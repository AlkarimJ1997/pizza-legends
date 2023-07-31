import { PIZZA_TYPES, PIZZA_SKINS, PIZZA_ICONS } from '@/utils/consts';

export const s001: PizzaConfig = {
	name: 'Slice Samurai',
	type: PIZZA_TYPES.SPICY,
	src: PIZZA_SKINS.S001,
	icon: PIZZA_ICONS.SPICY,
	moves: ['tackle', 'tomatoSqueeze', 'oliveOil'],
};

export const v001: PizzaConfig = {
	name: 'Call Me Kale',
	type: PIZZA_TYPES.VEGGIE,
	src: PIZZA_SKINS.V001,
	icon: PIZZA_ICONS.VEGGIE,
	moves: ['tackle'],
};

export const f001: PizzaConfig = {
	name: 'Portobello Express',
	type: PIZZA_TYPES.FUNGI,
	src: PIZZA_SKINS.F001,
	icon: PIZZA_ICONS.FUNGI,
	moves: ['tackle'],
};
