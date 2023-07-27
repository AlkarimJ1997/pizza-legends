import { DIRECTIONS, directionUpdateMap } from '@/utils/consts';

export const asGridCoord = (x: number, y: number) => `${x},${y}`;

export const emitEvent = (name: string, detail: { whoId: string }) => {
	const event = new CustomEvent(name, { detail });

	document.dispatchEvent(event);
};

export const getNextCoords = (
	targetX: number,
	targetY: number,
	direction: Direction
) => {
	const { x, y } = directionUpdateMap[direction];

	return { x: targetX + x, y: targetY + y };
};

export const oppositeDirection = (direction: Direction) => {
	switch (direction) {
		case DIRECTIONS.UP:
			return DIRECTIONS.DOWN;
		case DIRECTIONS.DOWN:
			return DIRECTIONS.UP;
		case DIRECTIONS.LEFT:
			return DIRECTIONS.RIGHT;
		default:
			return DIRECTIONS.LEFT;
	}
};
