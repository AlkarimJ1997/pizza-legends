export const CELL_SIZE = 16;

export const PLACEMENT_TYPES = {
	HERO: 'HERO',
	NPC: 'NPC',
} as const;

export const EVENTS = {
	WALK: 'WALK',
	STAND: 'STAND',
	MESSAGE: 'MESSAGE',
	MAP_CHANGE: 'MAP_CHANGE',
	BATTLE: 'BATTLE',
	PAUSE: 'PAUSE',
  STORY_FLAG: 'STORY_FLAG',
} as const;

export const BATTLE_EVENTS = {
	SUBMISSION_MENU: 'SUBMISSION_MENU',
	STATE_CHANGE: 'STATE_CHANGE',
	ANIMATION: 'ANIMATION',
	SWAP: 'SWAP',
	REPLACEMENT_MENU: 'REPLACEMENT_MENU',
	GIVE_EXP: 'GIVE_EXP',
} as const;

export const ANIMATIONS = {
	SPIN: 'SPIN',
	GLOB: 'GLOB',
} as const;

export const ACTION_TYPES = {
	FRIENDLY: 'FRIENDLY',
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

export const BG_COLORS: Record<MapName, string> = {
	DemoRoom: '#e7c6b1',
	Kitchen: '#c7c7e2',
	DiningRoom: '#e1ad7d',
	GreenKitchen: '#c9e1ac',
	PizzaShop: '#e3c1ad',
	Street: '#bfbebd',
	StreetNorth: '#acbd9e',
	TestWalkingMap: '#c0e7d9',
};

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

// Battle specific stuff
export const STATUSES = {
	CLUMSY: 'CLUMSY',
	SAUCY: 'SAUCY',
} as const;

export const TEAMS = {
	PLAYER: 'PLAYER',
	ENEMY: 'ENEMY',
} as const;

export const PIZZA_TYPES = {
	NORMAL: 'NORMAL',
	SPICY: 'SPICY',
	VEGGIE: 'VEGGIE',
	FUNGI: 'FUNGI',
	CHILL: 'CHILL',
} as const;

export const PIZZA_SKINS = {
	S001: '/images/characters/pizzas/s001.png',
	S002: '/images/characters/pizzas/s002.png',
	V001: '/images/characters/pizzas/v001.png',
	F001: '/images/characters/pizzas/f001.png',
} as const;

export const PIZZA_ICONS = {
	NORMAL: '/images/icons/normal.png',
	SPICY: '/images/icons/spicy.png',
	VEGGIE: '/images/icons/veggie.png',
	FUNGI: '/images/icons/fungi.png',
	CHILL: '/images/icons/chill.png',
} as const;

// Story Flags
export const STORY_FLAGS = {
	TALKED_TO_ERIO: 'TALKED_TO_ERIO',
  DEFEATED_BETH: 'DEFEATED_BETH',
} as const;
