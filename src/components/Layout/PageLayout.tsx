import { ReactNode } from 'react';
import { AppNavbar } from './AppNavbar';
import { AppFooter } from './AppFooter';

interface PageLayoutProps {
	children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className='flex flex-col min-h-screen w-full'>
			<AppNavbar />
			<main className='flex-1'>{children}</main>
			<AppFooter />
		</div>
	);
}
