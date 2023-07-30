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
				'absolute text-[5px] left-[47px] bottom-[-3px] px-[2px] bg-black/80 text-slate-100 m-0',
				status.type === STATUSES.CLUMSY && 'bg-[#582A79]',
				status.type === STATUSES.SAUCY && 'text-red-400'
			)}>
			{status.type}
		</p>
	);
};

export default StatusIndicator;
