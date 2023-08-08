import BattleHud from '@/components/battle/BattleHud';
import Image from 'next/image';

interface HudProps {
	overworld: OverworldChanges;
}

const Hud = ({ overworld }: HudProps) => {
	if (!overworld.hud || overworld.battle) return null;

	const { party } = overworld.hud.playerState;

	return (
		<div
			className='absolute left-0 -top-6 scale-[2]'
			style={{
				imageRendering: 'pixelated',
			}}>
			{party.map(member => (
				<div key={member.id} className='relative mb-14'>
					<BattleHud config={member} hp={member.hp} xp={member.xp} isActive />
				</div>
			))}
		</div>
	);
};

export default Hud;
