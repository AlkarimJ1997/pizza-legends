import PizzaHud from '@/components/ui/PizzaHud';

interface HudProps {
	overworld: OverworldChanges;
}

const MainHud = ({ overworld }: HudProps) => {
	if (!overworld.hud || overworld.battle) return null;

	const { playerState } = overworld.hud;

	return (
		<div
			className='absolute left-0 -top-10 scale-[1.5] sm:scale-[2] sm:-top-6'
			style={{
				imageRendering: 'pixelated',
			}}>
			{playerState.party
				.filter(m => playerState.lineup.includes(m.id))
				.map(member => (
					<div key={member.id} className='relative mb-14'>
						<PizzaHud config={member} hp={member.hp} xp={member.xp} isActive />
					</div>
				))}
		</div>
	);
};

export default MainHud;
