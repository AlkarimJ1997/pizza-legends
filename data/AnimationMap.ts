import { ANIMATIONS } from '@/utils/consts';
import { spin } from './animations';

const Animations: Record<BattleAnimationName, Function> = {
	[ANIMATIONS.SPIN]: spin,
};

export default Animations;
