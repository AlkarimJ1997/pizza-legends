/* eslint-disable @next/next/no-img-element */
import { TEAMS } from '@/utils/consts';
import type { Combatant } from '@/classes/battle/Combatant';
import clsx from 'clsx';

interface PizzaProps {
	combatant: Combatant;
	team: keyof typeof TEAMS;
}

const Pizza = ({ combatant, team }: PizzaProps) => {
	const { config, isActive, isBlinking, animateSpin, animateGlob } = combatant;

	return (
		<div>
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
						team === TEAMS.ENEMY && 'left-[227px] top-[56px] animate-glob-left'
					)}>
					<svg viewBox='0 0 32 32' width='32' height='32'>
						<circle cx='16' cy='16' r='16' fill='var(--glob-clr)' />
					</svg>
				</div>
			)}
		</div>
	);
};

export default Pizza;
