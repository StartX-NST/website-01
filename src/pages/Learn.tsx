import { AnimatedPage } from '@/components/animations';
import { ComingSoon } from '@/components/ui/coming-soon';

// Mock course data - empty array to show empty state
const coursesData: any[] = [];

export default function Learn() {
	// Commented out unused state and filters
	// const [selectedDifficulty, setSelectedDifficulty] = useState('all');

	// Filter courses based on selected difficulty
	// const filteredCourses = coursesData.filter((course) => {
	// 	return (
	// 		selectedDifficulty === 'all' ||
	// 		course.difficulty === selectedDifficulty
	// 	);
	// });

	return (
		<AnimatedPage>
			<ComingSoon
				section="Learn"
				title="Coming Soon"
				message="Learning resources, courses, and tutorials will be available here soon."
				showHomeButton={false}
			/>
		</AnimatedPage>
	);
}
