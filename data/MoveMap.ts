import { tackle, tomatoSqueeze, oliveOil } from './moves';

export type MoveName = 'tackle' | 'tomatoSqueeze' | 'oliveOil';

const Moves: Record<MoveName, MoveConfig> = {
	tackle,
	tomatoSqueeze,
	oliveOil,
};

export default Moves;
