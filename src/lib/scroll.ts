/**
 * Smooth scroll to an element by ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 100px for header)
 */
export function smoothScrollToElement(elementId: string, offset: number = 100) {
	const element = document.getElementById(elementId);
	if (element) {
		if (window.__lenis) {
			window.__lenis.scrollTo(element, { offset: -offset });
		} else {
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});
		}
	}
}

/**
 * Smooth scroll to top of page
 */
export function smoothScrollToTop() {
	if (window.__lenis) {
		window.__lenis.scrollTo(0);
	} else {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}
}
