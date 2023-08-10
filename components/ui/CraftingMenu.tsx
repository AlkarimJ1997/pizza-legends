interface CraftingMenuProps {
	overworld: OverworldChanges;
}

const CraftingMenu = ({ overworld }: CraftingMenuProps) => {
	if (!overworld.craftingMenu) return null;

	return (
		<div className='absolute inset-0 bg-red-500'>
			<h2>Create a Pizza</h2>
		</div>
	);
};

export default CraftingMenu;
