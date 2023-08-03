import { ANIMATIONS } from '@/utils/consts';
import { spin, glob } from './animations';

const Animations = {
	[ANIMATIONS.SPIN]: spin,
  [ANIMATIONS.GLOB]: glob,
} as const;

export default Animations;
