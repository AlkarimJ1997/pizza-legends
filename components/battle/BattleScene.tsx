import BattleHud from '@/components/battle/BattleHud';
import BattleImage from '@/components/battle/BattleImage';
import Pizza from '@/components/battle/Pizza';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	const { combatants } = overworld.battle;

	return (
		<div className='battle w-battleWidth h-battleHeight'>
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
			{combatants.map(combatant => (
				<>
					<BattleHud
						key={combatant.config.id}
						config={combatant.config}
						isActive={combatant.isActive}
						hp={combatant.hpPercentage}
						xp={combatant.xpPercentage}
					/>
					<Pizza key={combatant.config.id} combatant={combatant} />
				</>
			))}
		</div>
	);
};

export default BattleScene;
