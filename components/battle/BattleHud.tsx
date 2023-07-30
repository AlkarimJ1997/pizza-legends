import { TEAMS, STATUSES } from '@/utils/consts';
import Image from 'next/image';
import clsx from 'clsx';
import BarSvg from '@/assets/BarSvg';
import StatusIndicator from '@/components/battle/Status';

interface BattleHudProps {
	config: CombatantConfig;
	isActive: boolean;
	hp: number;
	xp: number;
}

const BattleHud = ({ config, isActive, hp, xp }: BattleHudProps) => {
	const team = config.belongsToTeam;

	return (
		<div
			className={clsx(
				'combatant-plate absolute w-[67px] h-[14px] scale-[2]',
				team === TEAMS.PLAYER && 'top-[70px] left-[46px]',
				team === TEAMS.ENEMY && 'top-[28px] right-[77px]',
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
			<BarSvg
				data={hp}
				viewBox='0 0 26 3'
				primaryFill='#82ff71'
				secondaryFill='#3ef126'
				className='h-[3px] top-[4px]'
			/>
			<BarSvg
				data={xp}
				viewBox='0 0 26 2'
				primaryFill='#ffd76a'
				secondaryFill='#ffc934'
				className='h-[2px] top-[8px]'
			/>
			{config.status && <StatusIndicator status={config.status} />}
		</div>
	);
};

export default BattleHud;
