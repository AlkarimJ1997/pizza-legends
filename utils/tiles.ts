export const TILES: Record<string, [number, number][]> = {
	WALK_UP: [
		[1, 2],
		[0, 2],
		[3, 2],
		[0, 2],
	],
	WALK_DOWN: [
		[1, 0],
		[0, 0],
		[3, 0],
		[0, 0],
	],
	WALK_LEFT: [
		[1, 3],
		[0, 3],
		[3, 3],
		[0, 3],
	],
	WALK_RIGHT: [
		[1, 1],
		[0, 1],
		[3, 1],
		[0, 1],
	],
	IDLE_UP: [[0, 2]],
	IDLE_DOWN: [[0, 0]],
	IDLE_LEFT: [[0, 3]],
	IDLE_RIGHT: [[0, 1]],
};
