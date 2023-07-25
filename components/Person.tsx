import { SHADOW } from '@/utils/consts';
import Sprite from '@/components/Sprite';

interface PersonProps {
	skinSrc: Skin;
	frameCoord: [number, number];
}

export default function Person({ skinSrc, frameCoord }: PersonProps) {
	return (
		<div className='relative'>
			<Sprite imageSrc={SHADOW} />
			<div>
				<Sprite imageSrc={skinSrc} frameCoord={frameCoord} />
			</div>
		</div>
	);
}
