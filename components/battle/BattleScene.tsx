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

	const setPrevFocus = (buttonEl: HTMLButtonElement | null) => {
		if (!keyboardMenu) return;

		keyboardMenu.prevFocus = buttonEl;
	};

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
				<div key={combatant.config.id}>
					<BattleHud
						config={combatant.config}
						isActive={combatant.isActive}
						hp={combatant.hpPercentage}
						xp={combatant.xpPercentage}
					/>
					<Pizza combatant={combatant} />
				</div>
			))}
			{keyboardMenu && (
				<Menu
					options={keyboardMenu.options}
					inBattle={!!overworld.battle}
					setPrevFocus={setPrevFocus}
				/>
			)}
		</div>
	);
};

export default BattleScene;
