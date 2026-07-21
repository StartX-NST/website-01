import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import { BackToTop } from '@/components/ui/back-to-top';
import { Footer } from '@/components/ui/footer';

export default function Layout() {
	const location = useLocation();

	return (
		<div className='min-h-screen bg-black flex flex-col'>
			<Header />
			<main
				id='main-content'
				className='pt-12 flex-grow'>
				<AnimatePresence mode='wait'>
					<Outlet key={location.pathname} />
				</AnimatePresence>
			</main>
			{location.pathname !== '/' && <Footer />}
			<BackToTop />
		</div>
	);
}
