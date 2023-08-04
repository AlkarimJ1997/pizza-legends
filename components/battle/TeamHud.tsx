import { TEAMS } from '@/utils/consts';
import type { Team } from '@/classes/battle/Team';
import clsx from 'clsx';
import LineupIcon from '@/assets/LineupIcon';

const TeamHud = ({ team }: { team: Team | null }) => {
	if (!team) return null;

	return (
		<div
			className={clsx(
				'flex absolute top-1 gap-1',
				team.owner === TEAMS.PLAYER && 'left-1',
				team.owner === TEAMS.ENEMY && 'right-1'
			)}>
			{team.combatants.map(combatant => (
				<div key={combatant.config.id}>
					<LineupIcon
						isActive={combatant.isActive}
						isAlive={combatant.hp > 0}
					/>
				</div>
			))}
		</div>
	);
};

export default TeamHud;
