import { TEAMS } from '@/utils/consts';
import Image from 'next/image';
import clsx from 'clsx';
import StatusIndicator from '@/components/battle/StatusIndicator';
import HealthBar from '@/components/battle/HealthBar';
import ExperienceBar from '@/components/battle/ExperienceBar';

interface BattleHudProps {
	config: CombatantConfig;
	isActive: boolean;
	hp: number;
	xp: number;
	inBattle?: boolean;
}

const PizzaHud = ({ config, isActive, inBattle = false }: BattleHudProps) => {
	const { belongsToTeam: team, hp, maxHp, xp, maxXp } = config;
  
	const hpRatio = Math.max(0, Math.min(100, (hp / maxHp) * 100));
	const xpRatio = (xp / maxXp) * 100;

	return (
		<div
			className={clsx(
				'absolute w-[67px] h-[14px] scale-[2] transition-opacity duration-[400ms]',
				team === TEAMS.PLAYER && 'top-[70px] left-[46px]',
				team === TEAMS.ENEMY && 'top-[28px] right-[77px]',
				isActive ? 'opacity-100' : 'opacity-0'
			)}
			style={{
				backgroundImage: 'url(/images/ui/combatant-plate.png)',
				backgroundRepeat: 'no-repeat no-repeat',
			}}>
			<p className='absolute top-[-8px] left-[-2px] whitespace-nowrap bg-slate-800 text-slate-100 text-[5px] px-[2px] m-0'>
				{config.name}
			</p>
			<p className='absolute text-[12px] top-[-1px] right-[2px] w-[17px] h-[12px] flex items-center justify-center m-0 bg-[#F8C594] border border-[#A48465]'>
				{config.level}
			</p>
			{inBattle ? (
				<Image
					src={config.icon}
					alt={config.type}
					width={30}
					height={30}
					className='absolute top-[-2px] left-[3px] w-[16px] h-[16px]'
				/>
			) : (
				<div className='absolute w-[22px] h-[12px] bottom-[1px] left-[3px] overflow-hidden'>
					<Image
						src={config.src}
						alt={config.name}
						width={32}
						height={32}
						className='object-cover absolute bottom-[-2px] left-[-3px]'
					/>
				</div>
			)}
			<HealthBar hp={hpRatio} />
			<ExperienceBar xp={xpRatio} />
			{config.status && <StatusIndicator status={config.status} team={team} />}
		</div>
	);
};

export default PizzaHud;
