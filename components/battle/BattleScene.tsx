/* eslint-disable @next/next/no-img-element */
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
	const ClassMap = {
		[ANIMATIONS.SPIN]: {
			[TEAMS.PLAYER]: 'animate-spin-right',
			[TEAMS.ENEMY]: 'animate-spin-left',
		},
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
			{combatants.map(({ config, hpPercentage, xpPercentage, isActive }) => (
				<div
					key={config.id}
					className={clsx(
						'combatant-plate absolute w-[67px] h-[14px] scale-[2]',
						config.belongsToTeam === TEAMS.PLAYER && 'top-[70px] left-[46px]',
						config.belongsToTeam === TEAMS.ENEMY && 'top-[28px] right-[77px]',
						isActive ? 'opacity-100' : 'opacity-0'
					)}>
					<p className='absolute top-[-8px] left-[-2px] whitespace-nowrap bg-slate-800 text-slate-100 text-[5px] px-[2px] m-0'>
						{config.name}
					</p>
					<p className='absolute text-[12px] top-[-1px] right-[2px] w-[17px] h-[12px] flex items-center justify-center m-0 bg-[#F8C594] border border-[#A48465]'>
						{config.level}
					</p>
					<div className='absolute w-[22px] h-[12px] bottom-[1px] left-[3px] overflow-hidden hidden'>
						<Image
							src={config.src}
							alt={config.name}
							width={30}
							height={30}
							className='block absolute bottom-[-7px] left-[-11px]'
						/>
					</div>
					<Image
						src={config.icon}
						alt={config.type}
						width={30}
						height={30}
						className='absolute top-[-2px] left-[3px] w-[16px] h-[16px]'
					/>
					<svg
						viewBox='0 0 26 3'
						className='absolute w-[26.5px] h-[3px] top-[4px] left-[19.5px] [&>rect]:transition-all [&>rect]:duration-200'>
						<rect
							x={0}
							y={0}
							width={`${hpPercentage}%`}
							height={1}
							fill='#82ff71'
						/>
						<rect
							x={0}
							y={1}
							width={`${hpPercentage}%`}
							height={2}
							fill='#3ef126'
						/>
					</svg>
					<svg
						viewBox='0 0 26 2'
						className='absolute w-[26px] h-[2px] top-[8px] left-[20px]'>
						<rect
							x={0}
							y={0}
							width={`${xpPercentage}%`}
							height={1}
							fill='#ffd76a'
						/>
						<rect
							x={0}
							y={1}
							width={`${xpPercentage}%`}
							height={1}
							fill='#ffc934'
						/>
					</svg>
					<p
						className={clsx(
							'absolute text-[5px] left-[47px] bottom-[-3px] px-[2px] bg-black/80 text-slate-100 m-0',
							config.status?.type === STATUSES.CLUMSY && 'bg-[#582A79]',
							config.status?.type === STATUSES.SAUCY && 'text-red-400'
						)}>
						{config.status?.type}
					</p>
				</div>
			))}
			{combatants.map(({ config, isActive, isBlinking, animation }) => (
				<img
					key={config.id}
					src={config.src}
					alt={config.name}
					className={clsx(
						'pizza-shadow inline absolute scale-[2]',
						config.belongsToTeam === TEAMS.PLAYER &&
							'bottom-[73px] left-[51px]',
						config.belongsToTeam === TEAMS.ENEMY && 'top-[47px] right-[100px]',
						isActive ? 'opacity-100' : 'opacity-0',
						isBlinking && 'animate-blink',
						animation && ClassMap[animation][config.belongsToTeam]
					)}
				/>
			))}
		</div>
	);
};

export default BattleScene;
