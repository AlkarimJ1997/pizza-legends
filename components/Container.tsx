import clsx from 'clsx';

interface ContainerProps {
	inBattle: boolean;
	children: React.ReactNode;
}

const Container = ({ inBattle, children }: ContainerProps) => {
	return (
		<div
			className={clsx(
				inBattle && 'w-battleWidth h-battleHeight scale-battlePixelSize',
				!inBattle && 'w-gameWidth h-gameHeight scale-pixelSize'
			)}>
			{children}
		</div>
	);
};

export default Container;
