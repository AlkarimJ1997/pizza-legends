import './globals.css';
import { Exo_2, Monda, Electrolize, Changa } from 'next/font/google';

const primary = Changa({
	subsets: ['latin'],
});

export const metadata = {
	title: 'Pizza Legends',
	description: 'A 2D RPG about Pizza Chefs!',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${primary.className} bg-indigo-400`}>{children}</body>
		</html>
	);
}
