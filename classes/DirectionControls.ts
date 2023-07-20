import { DIRECTIONS } from '@/utils/consts';

interface DirectionKeys {
	ArrowLeft: 'LEFT';
	ArrowRight: 'RIGHT';
	ArrowUp: 'UP';
	ArrowDown: 'DOWN';
	w: 'UP';
	a: 'LEFT';
	s: 'DOWN';
	d: 'RIGHT';
}

export class DirectionControls {
	directionKeys: DirectionKeys;
	heldDirections: Direction[];

	directionKeyDownHandler: (e: KeyboardEvent) => void;
	directionKeyUpHandler: (e: KeyboardEvent) => void;

	constructor() {
		this.directionKeys = {
			ArrowLeft: DIRECTIONS.LEFT,
			ArrowRight: DIRECTIONS.RIGHT,
			ArrowUp: DIRECTIONS.UP,
			ArrowDown: DIRECTIONS.DOWN,
			w: DIRECTIONS.UP,
			a: DIRECTIONS.LEFT,
			s: DIRECTIONS.DOWN,
			d: DIRECTIONS.RIGHT,
		};

		this.heldDirections = [];

		this.directionKeyDownHandler = (e: KeyboardEvent) => {
			const dir = this.directionKeys[e.key as keyof DirectionKeys];

			if (dir && !this.heldDirections.includes(dir)) {
				this.heldDirections.unshift(dir);
			}
		};

		this.directionKeyUpHandler = (e: KeyboardEvent) => {
			const dir = this.directionKeys[e.key as keyof DirectionKeys];
			const index = this.heldDirections.indexOf(dir);

			if (index > -1) {
				this.heldDirections.splice(index, 1);
			}
		};

		// Add event listeners
		document.addEventListener('keydown', this.directionKeyDownHandler);
		document.addEventListener('keyup', this.directionKeyUpHandler);
	}

	get direction() {
		return this.heldDirections[0];
	}

	unbind() {
		document.removeEventListener('keydown', this.directionKeyDownHandler);
		document.removeEventListener('keyup', this.directionKeyUpHandler);
	}
}
