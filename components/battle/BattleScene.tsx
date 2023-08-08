import PizzaHud from '@/components/ui/PizzaHud';
import BattleImage from '@/components/battle/BattleImage';
import Pizza from '@/components/battle/Pizza';
import TeamHud from '@/components/battle/TeamHud';
import BattleMenu from '@/components/battle/BattleMenu';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	const { combatants, trainer, keyboardMenu } = overworld.battle;

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
				src={trainer.src}
				alt={trainer.name}
				className='top-[42px] right-[-1px]'
			/>
			{combatants.map(combatant => (
				<div key={combatant.config.id}>
					<PizzaHud
						config={combatant.config}
						isActive={combatant.isActive}
						hp={combatant.hp}
						xp={combatant.xp}
						inBattle
					/>
					<Pizza combatant={combatant} />
				</div>
			))}
			<TeamHud team={overworld.battle.playerTeam} />
			<TeamHud team={overworld.battle.trainerTeam} />
			{keyboardMenu && <BattleMenu options={keyboardMenu.options} />}
		</div>
	);
};

export default BattleScene;
