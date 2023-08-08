import PizzaHud from '@/components/ui/PizzaHud';

interface HudProps {
	overworld: OverworldChanges;
}

const MainHud = ({ overworld }: HudProps) => {
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
					<PizzaHud config={member} hp={member.hp} xp={member.xp} isActive />
				</div>
			))}
		</div>
	);
};

export default MainHud;
