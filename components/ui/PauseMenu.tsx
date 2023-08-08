import Menu from '@/components/battle/BattleMenu';

interface PauseMenuProps {
	overworld: OverworldChanges;
}

const PauseMenu = ({ overworld }: PauseMenuProps) => {
	if (!overworld.pause) return null;

	const options = overworld.pause.keyboardMenu?.options ?? [];

	return (
		<div className='absolute inset-0 grid place-items-center'>
			{/* <Menu options={options} inBattle={false} /> */}
		</div>
	);
};

export default PauseMenu;
