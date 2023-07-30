import { STATUSES } from '@/utils/consts';
import clsx from 'clsx';

interface StatusIndicatorProps {
	status: {
		type: keyof typeof STATUSES;
		expiresIn: number;
	};
}

const StatusIndicator = ({ status }: StatusIndicatorProps) => {
	return (
		<p
			className={clsx(
				'absolute text-[5px] left-[47px] bottom-[-3px] px-[2px] rounded-[1px]',
				status.type === STATUSES.CLUMSY && 'bg-purple-800 text-slate-100',
				status.type === STATUSES.SAUCY && 'text-red-400 bg-slate-800'
			)}>
			{status.type}
		</p>
	);
};

export default StatusIndicator;
