import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollToTop } from '@/lib/scroll';

export function BackToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled down 300px
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.2 }}
					onClick={smoothScrollToTop}
					className='fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-500 hover:bg-blue-400 text-black shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 group'
					aria-label='Back to top'>
					<ArrowUp
						className='w-5 h-5 group-hover:-translate-y-0.5 transition-transform'
						strokeWidth={2.5}
					/>
				</motion.button>
			)}
		</AnimatePresence>
	);
}
