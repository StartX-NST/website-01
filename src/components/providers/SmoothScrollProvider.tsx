import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import type Lenis from 'lenis';

declare global {
	interface Window {
		__lenis?: Lenis;
	}
}

function RouteScrollReset() {
	const location = useLocation();
	const lenis = useLenis();

	useEffect(() => {
		if (lenis) {
			window.__lenis = lenis;
		}
	}, [lenis]);

	useEffect(() => {
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo(0, 0);
		}
	}, [location.pathname, lenis]);

	return null;
}

interface SmoothScrollProviderProps {
	children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
	return (
		<ReactLenis
			root
			options={{
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				wheelMultiplier: 1.0,
				touchMultiplier: 1.5,
				infinite: false,
			}}>
			<RouteScrollReset />
			{children}
		</ReactLenis>
	);
}

export default SmoothScrollProvider;
