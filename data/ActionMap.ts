import {
	tackle,
	tomatoSqueeze,
	oliveOil,
	item_recoverStatus,
	item_recoverHp,
} from './actions';

export type ActionName =
	| 'tackle'
	| 'tomatoSqueeze'
	| 'oliveOil'
	| 'item_recoverStatus'
	| 'item_recoverHp';

const Actions: Record<ActionName, ActionConfig> = {
	tackle,
	tomatoSqueeze,
	oliveOil,
	item_recoverStatus,
	item_recoverHp,
};

export default Actions;
