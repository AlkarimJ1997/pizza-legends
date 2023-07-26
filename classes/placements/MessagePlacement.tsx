import { OverworldState } from '@/classes/OverworldState';
import { Placement } from '@/classes/placements/Placement';
import TextMessage from '@/components/TextMessage';

export class MessagePlacement extends Placement {
	text: string;

	constructor(config: MessageConfig, overworld: OverworldState) {
		super(config, overworld);

		this.text = config.text;
	}

	renderComponent() {
		return <TextMessage text={this.text} />;
	}
}
