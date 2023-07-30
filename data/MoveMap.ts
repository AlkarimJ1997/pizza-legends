import { tackle, tomatoSqueeze } from './moves';

export type MoveName = 'tackle' | 'tomatoSqueeze';

const Moves: Record<MoveName, MoveConfig> = {
	tackle,
	tomatoSqueeze,
};

export default Moves;
