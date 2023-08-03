import { PIZZA_TYPES, PIZZA_SKINS, PIZZA_ICONS } from '@/utils/consts';

export const s001: PizzaConfig = {
	name: 'Slice Samurai',
	description: 'A classic pizza with a spicy kick.',
	type: PIZZA_TYPES.SPICY,
	src: PIZZA_SKINS.S001,
	icon: PIZZA_ICONS.SPICY,
	actions: ['tackle', 'tomatoSqueeze', 'oliveOil'],
};

export const s002: PizzaConfig = {
	name: 'Bacon Brigade',
	description: 'A spicy bacon pizza.',
	type: PIZZA_TYPES.SPICY,
	src: PIZZA_SKINS.S002,
	icon: PIZZA_ICONS.SPICY,
	actions: ['tackle', 'tomatoSqueeze', 'oliveOil'],
};

export const v001: PizzaConfig = {
	name: 'Call Me Kale',
	description: 'A veggie pizza great for your health.',
	type: PIZZA_TYPES.VEGGIE,
	src: PIZZA_SKINS.V001,
	icon: PIZZA_ICONS.VEGGIE,
	actions: ['tackle'],
};

export const f001: PizzaConfig = {
	name: 'Portobello Express',
	description: 'A mushroom pizza with so much flavor.',
	type: PIZZA_TYPES.FUNGI,
	src: PIZZA_SKINS.F001,
	icon: PIZZA_ICONS.FUNGI,
	actions: ['tackle'],
};
