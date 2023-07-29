/* eslint-disable @next/next/no-img-element */
import BattleImage from '@/components/battle/BattleImage';
import { STATUSES, TEAMS } from '@/utils/consts';
import clsx from 'clsx';
import Image from 'next/image';

interface BattleSceneProps {
	overworld: OverworldChanges;
}

const BattleScene = ({ overworld }: BattleSceneProps) => {
	if (!overworld.battle) return null;

	const { combatants } = overworld.battle;

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
				{Object.entries(combatants).map(([id, { config }]) => (
					<div
						key={id}
						className={clsx(
							'combatant-plate absolute w-[67px] h-[14px] scale-[2]',
							config.belongsToTeam === TEAMS.PLAYER && 'top-[70px] left-[46px]',
							config.belongsToTeam === TEAMS.ENEMY && 'top-[28px] right-[77px]'
						)}>
						<p className='absolute top-[-8px] left-[-2px] whitespace-nowrap bg-slate-800 text-slate-100 text-[5px] px-[2px] m-0'>
							{config.name}
						</p>
						<p className='absolute text-[12px] top-[-1px] right-[2px] w-[17px] h-[12px] flex items-center justify-center m-0 bg-[#F8C594] border border-[#A48465]'></p>
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
							className='absolute w-[26px] h-[3px] top-[4px] left-[20px] [&>rect]:transition-all [&>rect]:duration-200'>
							<rect x={0} y={0} width='0%' height={1} fill='#82ff71' />
							<rect x={0} y={1} width='0%' height={2} fill='#3ef126' />
						</svg>
						<svg
							viewBox='0 0 26 2'
							className='absolute w-[26px] h-[2px] top-[8px] left-[20px]'>
							<rect x={0} y={0} width='0%' height={1} fill='#ffd76a' />
							<rect x={0} y={1} width='0%' height={1} fill='#ffc934' />
						</svg>
						<p
							className={clsx(
								'absolute text-[5px] left-[47px] bottom-[-3px] px-[2px] bg-black/80 text-slate-100 m-0',
								config.status?.type === STATUSES.CLUMSY && 'bg-[#582A79]',
								config.status?.type === STATUSES.SAUCY && 'text-red-400'
							)}></p>
					</div>
				))}
			</div>
		</div>
	);
};

export default BattleScene;
