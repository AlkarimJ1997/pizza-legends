import { tackle, tomatoSqueeze, oliveOil } from './actions';

export type ActionName = 'tackle' | 'tomatoSqueeze' | 'oliveOil';

const Actions: Record<ActionName, ActionConfig> = {
	tackle,
	tomatoSqueeze,
	oliveOil,
};

export default Actions;
