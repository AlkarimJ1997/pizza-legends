import type { OverworldState } from '@/classes/OverworldState';
import { EVENTS, PIZZA_STONE } from '@/utils/consts';
import { Placement } from '@/classes/placements/Placement';
import { playerState } from '@/classes/state/PlayerState';
import Sprite from '@/components/Sprite';
import Pizzas from '@/data/PizzaMap';

export class PizzaStonePlacement extends Placement {
	storyFlag: StoryFlag;
	pizzas: (keyof typeof Pizzas)[];

	constructor(config: PizzaStoneConfig, overworld: OverworldState) {
		super(config, overworld);

		this.animations = {
			'used-down': [[0, 0]],
			'unused-down': [[1, 0]],
		};

		this.currentAnimation = 'used-down';
		this.storyFlag = config.flag;
		this.pizzas = config.pizzas;
		this.talking = [
			{
				disqualify: [this.storyFlag],
				events: [{ type: EVENTS.MESSAGE, text: 'You have already used this.' }],
			},
			{
				events: [
					{
						type: EVENTS.MESSAGE,
						text: 'Approaching the legendary pizza stone...',
					},
					{ type: EVENTS.MESSAGE, text: 'You feel a strange energy!' },
					{ type: EVENTS.CRAFTING, pizzas: this.pizzas },
					{ type: EVENTS.STORY_FLAG, flag: this.storyFlag },
				],
			},
		];
	}

	tick() {
		this.updateSprite();
	}

	updateSprite() {
		if (playerState.storyFlags[this.storyFlag]) {
			this.currentAnimation = 'used-down';
			return;
		}

		this.currentAnimation = 'unused-down';
	}

	renderComponent() {
		return <Sprite skinSrc={PIZZA_STONE} frameCoord={this.frame} />;
	}
}
