import { STATUSES, TEAMS } from '@/utils/consts';
import clsx from 'clsx';

interface StatusIndicatorProps {
	status: {
		type: keyof typeof STATUSES;
		expiresIn: number;
	};
	team: 'PLAYER' | 'ENEMY';
}

const StatusIndicator = ({ status, team }: StatusIndicatorProps) => {
	return (
		<p
			className={clsx(
				'absolute text-[4px] bottom-[-3px] px-[2px] rounded-[1px]',
				status.type === STATUSES.CLUMSY && 'bg-purple-800 text-slate-100',
				status.type === STATUSES.SAUCY && 'bg-red-400 text-slate-100',
				team === TEAMS.PLAYER && 'left-[49px]',
				team === TEAMS.ENEMY && 'left-[48px]'
			)}>
			{status.type}
		</p>
	);
};

export default StatusIndicator;
