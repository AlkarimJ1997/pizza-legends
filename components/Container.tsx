import clsx from 'clsx';

interface ContainerProps {
	inBattle: boolean;
	children: React.ReactNode;
}

const Container = ({ inBattle, children }: ContainerProps) => {
	return (
		<div
			className={clsx(
				// inBattle && 'w-battleWidth h-battleHeight',
				!inBattle && 'w-gameWidth h-gameHeight'
			)}>
			{children}
		</div>
	);
};

export default Container;
