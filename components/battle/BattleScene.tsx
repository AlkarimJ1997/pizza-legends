/* eslint-disable @next/next/no-img-element */
import BattleImage from '@/components/battle/BattleImage';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	return (
		<div className='fixed inset-0 grid place-items-center'>
			<div className='battle w-battleWidth h-battleHeight scale-battlePixelSize'>
				<BattleImage
					src='/images/characters/people/hero.png'
					alt='Hero'
					className='bottom-[57px] left-[1px] [&>img]:-translate-y-16'
				/>
				<BattleImage
					src='/images/characters/people/npc3.png'
					alt='Trainer'
					className='top-[42px] right-[-1px]'
				/>
			</div>
		</div>
	);
};

export default BattleScene;
