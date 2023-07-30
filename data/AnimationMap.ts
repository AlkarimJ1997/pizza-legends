import { ANIMATIONS } from '@/utils/consts';
import { spin, glob } from './animations';

const Animations: Record<BattleAnimationName, Function> = {
	[ANIMATIONS.SPIN]: spin,
  [ANIMATIONS.GLOB]: glob,
};

export default Animations;
