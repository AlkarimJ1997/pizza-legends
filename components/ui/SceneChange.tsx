import clsx from 'clsx';

interface SceneChangeProps {
	overworld: OverworldChanges;
}

const SceneChange = ({ overworld }: SceneChangeProps) => {
	if (!overworld.sceneTransition) return null;

	const { exit } = overworld.sceneTransition;

	return (
		<div
			className={clsx(
				'absolute inset-0 bg-black opacity-0',
				exit ? 'animate-fade-out' : 'animate-fade-in'
			)}
		/>
	);
};

export default SceneChange;
