import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import { BackToTop } from '@/components/ui/back-to-top';

export default function Layout() {
	const location = useLocation();

	return (
		<div className='min-h-screen bg-black'>
			<Header />
			<main
				id='main-content'
				className='pt-12'>
				<AnimatePresence mode='wait'>
					<Outlet key={location.pathname} />
				</AnimatePresence>
			</main>
			<BackToTop />
		</div>
	);
}
