export const CELL_SIZE = 16;

export const PLACEMENT_TYPES = {
	HERO: 'HERO',
	PERSON: 'PERSON',
} as const;

export const BEHAVIOR_TYPES = {
	WALK: 'WALK',
	STAND: 'STAND',
} as const;

export const CUSTOM_EVENTS = {
	WALK: 'PersonWalkingComplete',
	STAND: 'PersonStandingComplete',
} as const;

export const SKINS = {
	HERO: '/images/characters/people/hero.png',
	ERIO: '/images/characters/people/erio.png',
	NPC1: '/images/characters/people/npc1.png',
	NPC2: '/images/characters/people/npc2.png',
	NPC3: '/images/characters/people/npc3.png',
	NPC4: '/images/characters/people/npc4.png',
	NPC5: '/images/characters/people/npc5.png',
	NPC6: '/images/characters/people/npc6.png',
	NPC7: '/images/characters/people/npc7.png',
	NPC8: '/images/characters/people/npc8.png',
	SECOND_BOSS: '/images/characters/people/secondBoss.png',
} as const;

export const SHADOW = '/images/characters/shadow.png';

export const MAPS = {
	DemoRoom: {
		lowerSrc: '/images/maps/DemoLower.png',
		upperSrc: '/images/maps/DemoUpper.png',
	},
	DiningRoom: {
		lowerSrc: '/images/maps/DiningRoomLower.png',
		upperSrc: '/images/maps/DiningRoomUpper.png',
	},
	GreenKitchen: {
		lowerSrc: '/images/maps/GreenKitchenLower.png',
		upperSrc: '/images/maps/GreenKitchenUpper.png',
	},
	Kitchen: {
		lowerSrc: '/images/maps/KitchenLower.png',
		upperSrc: '/images/maps/KitchenUpper.png',
	},
	PizzaShop: {
		lowerSrc: '/images/maps/PizzaShopLower.png',
		upperSrc: '/images/maps/PizzaShopUpper.png',
	},
	Street: {
		lowerSrc: '/images/maps/StreetLower.png',
		upperSrc: '/images/maps/StreetUpper.png',
	},
	StreetNorth: {
		lowerSrc: '/images/maps/StreetNorthLower.png',
		upperSrc: '/images/maps/StreetNorthUpper.png',
	},
	TestWalkingMap: {
		lowerSrc: '/images/maps/TestWalkingMapLower.png',
		upperSrc: '/images/maps/TestWalkingMapUpper.png',
	},
} as const;

export const DIRECTIONS = {
	UP: 'UP',
	DOWN: 'DOWN',
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
} as const;

export const directionUpdateMap = {
	[DIRECTIONS.LEFT]: { x: -1, y: 0 },
	[DIRECTIONS.RIGHT]: { x: 1, y: 0 },
	[DIRECTIONS.UP]: { x: 0, y: -1 },
	[DIRECTIONS.DOWN]: { x: 0, y: 1 },
} as const;
