import { asGridCoord } from '@/utils/helpers';

export const WALLS: Record<MapName, { [key: string]: boolean }> = {
	DemoRoom: {
		[asGridCoord(7, 5)]: true,
		[asGridCoord(8, 5)]: true,
		[asGridCoord(7, 6)]: true,
		[asGridCoord(8, 6)]: true,
	},
	DiningRoom: {},
	Kitchen: {},
	GreenKitchen: {},
	PizzaShop: {},
	Street: {},
	StreetNorth: {},
	TestWalkingMap: {},
};
