/* eslint-disable @next/next/no-img-element */
import BattleHud from '@/components/battle/BattleHud';
import BattleImage from '@/components/battle/BattleImage';
import { ANIMATIONS, STATUSES, TEAMS } from '@/utils/consts';
import clsx from 'clsx';
import Image from 'next/image';

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
			{combatants.map(({ config, hpPercentage, xpPercentage, isActive }) => (
				<BattleHud
					key={config.id}
					config={config}
					isActive={isActive}
					hp={hpPercentage}
					xp={xpPercentage}
				/>
			))}
			{combatants.map(
				({ config, isActive, isBlinking, animateSpin, animateGlob }) => {
					const team = config.belongsToTeam;

					return (
						<div key={config.id}>
							<img
								src={config.src}
								alt={config.name}
								className={clsx(
									'pizza-shadow inline absolute scale-[2]',
									team === TEAMS.PLAYER && 'bottom-[73px] left-[51px]',
									team === TEAMS.ENEMY && 'top-[47px] right-[100px]',
									isActive ? 'opacity-100' : 'opacity-0',
									isBlinking && 'animate-blink',
									animateSpin && team === TEAMS.PLAYER && 'animate-spin-right',
									animateSpin && team === TEAMS.ENEMY && 'animate-spin-left'
								)}
							/>
							{animateGlob && (
								<div
									className={clsx(
										'absolute w-8 h-8',
										team === TEAMS.PLAYER &&
											'left-[70px] top-[104px] animate-glob-right',
										team === TEAMS.ENEMY &&
											'left-[227px] top-[56px] animate-glob-left'
									)}>
									<svg viewBox='0 0 32 32' width='32' height='32'>
										<circle cx='16' cy='16' r='16' fill='var(--glob-clr)' />
									</svg>
								</div>
							)}
						</div>
					);
				}
			)}
		</div>
	);
};

export default BattleScene;
