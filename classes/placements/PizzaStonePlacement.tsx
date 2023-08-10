import type { OverworldState } from '@/classes/OverworldState';
import { PIZZA_STONE } from '@/utils/consts';
import { Placement } from '@/classes/placements/Placement';
import Sprite from '@/components/Sprite';

export class PizzaStonePlacement extends Placement {
	constructor(config: PizzaStoneConfig, overworld: OverworldState) {
		super(config, overworld);

		this.animations = {
			'used-down': [[0, 0]],
			'unused-down': [[1, 0]],
		};
		this.currentAnimation = 'used-down';
	}

	renderComponent() {
		return <Sprite skinSrc={PIZZA_STONE} frameCoord={this.frame} />;
	}
}
