'use client';

import { Provider } from 'jotai';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <Provider>{children}z</Provider>;
};

export default Providers;
