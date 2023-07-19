'use client';

import { RecoilRoot } from 'recoil';
import RenderLevel from '@/components/RenderLevel';

const Home = () => {
	return (
		<RecoilRoot>
			<RenderLevel />
		</RecoilRoot>
	);
};

export default Home;
