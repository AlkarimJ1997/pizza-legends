import Image from 'next/image';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	return (
		<div className='fixed inset-0 battle'>
			<div className='Battle_hero'>
				<Image
					src='/images/characters/people/hero.png'
					alt='Hero'
					width={128}
					height={128}
				/>
			</div>
			<div className='Battle_trainer'>
				<Image
					src='/images/characters/people/npc3.png'
					alt='Trainer'
					width={128}
					height={128}
				/>
			</div>
		</div>
	);
};

export default BattleScene;
