/**
 * Smooth scroll to an element by ID
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top (default: 100px for header)
 */
export function smoothScrollToElement(elementId: string, offset: number = 100) {
	const element = document.getElementById(elementId);
	if (element) {
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		});
	}
}

/**
 * Smooth scroll to top of page
 */
export function smoothScrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
}
