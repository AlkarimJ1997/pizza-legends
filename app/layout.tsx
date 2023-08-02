import './globals.css';
import {
	Electrolize,
	Changa,
	VT323,
	Ubuntu_Mono,
	Syne_Mono,
	Nova_Mono,
} from 'next/font/google';
import localFont from 'next/font/local';

// const primary = localFont({ src: '../fonts/BadComic-Regular.woff2' });

const primary = Syne_Mono({
	weight: ['400'],
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
