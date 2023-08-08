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
			{playerState.lineup.map(id => {
				const member = playerState.party.find(m => m.id === id);

				if (!member) return null;

				return (
					<div key={member.id} className='relative mb-14'>
						<PizzaHud config={member} hp={member.hp} xp={member.xp} isActive />
					</div>
				);
			})}
		</div>
	);
};

export default MainHud;
