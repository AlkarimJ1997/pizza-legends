import BattleHud from '@/components/battle/BattleHud';
import BattleImage from '@/components/battle/BattleImage';
import Pizza from '@/components/battle/Pizza';
import Menu from '@/components/ui/Menu';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	const { combatants, keyboardMenu } = overworld.battle;

	return (
		<div
			className='w-full h-full bg-cover'
			style={{
				backgroundImage: `url(/images/maps/StreetBattle.png)`,
				imageRendering: 'pixelated',
			}}>
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
				<div key={combatant.config.id}>
					<BattleHud
						config={combatant.config}
						isActive={combatant.isActive}
						hp={combatant.hp}
						xp={combatant.xp}
					/>
					<Pizza combatant={combatant} />
				</div>
			))}
			{keyboardMenu && (
				<Menu options={keyboardMenu.options} inBattle={!!overworld.battle} />
			)}
		</div>
	);
};

export default BattleScene;
