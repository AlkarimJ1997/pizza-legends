import type { Placement } from '@/classes/Placement';
import type { OverworldState } from '@/classes/OverworldState';

type Position = { x: number; y: number } | null;

export class Collision {
	forBody: Placement;
	overworld: OverworldState;
	placementsAtPosition: Placement[];
	x: number;
	y: number;

	constructor(
		forBody: Placement,
		overworld: OverworldState,
		position: Position = null
	) {
		this.forBody = forBody;
		this.overworld = overworld;
		this.placementsAtPosition = [];
		this.x = position?.x ?? forBody.x;
		this.y = position?.y ?? forBody.y;

		this.scanPlacementsAtPosition();
	}

	scanPlacementsAtPosition() {
		this.placementsAtPosition = this.overworld.placements.filter(p => {
			const isSelf = p.id === this.forBody.id;

			return !isSelf && p.x === this.x && p.y === this.y;
		});
	}

	withSolidPlacement() {
		return this.placementsAtPosition.find(p => p.isSolidForBody(this.forBody));
	}
}
