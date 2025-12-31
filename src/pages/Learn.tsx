import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { CourseCard, LearningFilters } from '@/components/learn';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';
import { BGPattern } from '@/components/ui/bg-pattern';

// Mock course data
const coursesData = [
	{
		id: '1',
		title: 'Finding Product-Market Fit',
		description:
			'Learn systematic approaches to validate your product idea and find the perfect market fit for your startup.',
		duration: '4 weeks',
		difficulty: 'beginner' as const,
		modules: 8,
		enrolled: 234,
		completed: false,
	},
	{
		id: '2',
		title: 'Growth Marketing Fundamentals',
		description:
			'Master growth hacking techniques and marketing strategies used by successful startups to scale rapidly.',
		duration: '6 weeks',
		difficulty: 'intermediate' as const,
		modules: 12,
		enrolled: 189,
		completed: false,
	},
	{
		id: '3',
		title: 'Building Your MVP Fast',
		description:
			'Rapid prototyping techniques and no-code tools to build and launch your minimum viable product quickly.',
		duration: '3 weeks',
		difficulty: 'beginner' as const,
		modules: 6,
		enrolled: 312,
		completed: false,
	},
	{
		id: '4',
		title: 'Fundraising: Seed to Series A',
		description:
			'Navigate the fundraising landscape, from crafting your pitch deck to closing your first major round.',
		duration: '5 weeks',
		difficulty: 'intermediate' as const,
		modules: 10,
		enrolled: 156,
		completed: false,
	},
	{
		id: '5',
		title: 'Technical Architecture for Founders',
		description:
			"Understand the technical decisions that matter when building scalable products, even if you're non-technical.",
		duration: '6 weeks',
		difficulty: 'advanced' as const,
		modules: 14,
		enrolled: 98,
		completed: false,
	},
	{
		id: '6',
		title: 'Building High-Performance Teams',
		description:
			'Learn how to recruit, motivate, and retain top talent while building a strong startup culture.',
		duration: '4 weeks',
		difficulty: 'intermediate' as const,
		modules: 9,
		enrolled: 201,
		completed: false,
	},
	{
		id: '7',
		title: 'Customer Discovery & Validation',
		description:
			'Master the art of talking to customers, uncovering real problems, and validating your assumptions.',
		duration: '3 weeks',
		difficulty: 'beginner' as const,
		modules: 7,
		enrolled: 278,
		completed: true,
	},
	{
		id: '8',
		title: 'Scaling Operations',
		description:
			'Systems and processes to scale your startup operations efficiently as you grow your team and customer base.',
		duration: '5 weeks',
		difficulty: 'advanced' as const,
		modules: 11,
		enrolled: 87,
		completed: false,
	},
];

export default function Learn() {
	const [selectedDifficulty, setSelectedDifficulty] = useState('all');

	// Filter courses based on selected difficulty
	const filteredCourses = coursesData.filter((course) => {
		return (
			selectedDifficulty === 'all' ||
			course.difficulty === selectedDifficulty
		);
	});

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black relative'>
				{/* Diagonal Stripes Background Pattern */}
				<BGPattern
					variant='diagonal-stripes'
					mask='fade-y'
					size={60}
					fill='rgba(255, 255, 255, 0.08)'
				/>

				{/* All Courses Section */}
				<section className='relative py-12 md:py-16 lg:py-20 px-6 overflow-hidden'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='mb-8'>
							<div className='flex items-center gap-3 mb-4'>
								<BookOpen className='w-6 h-6 text-blue-400' />
								<h2 className='text-2xl md:text-3xl font-bold text-white'>
									All Courses
								</h2>
							</div>
							<p className='text-gray-400 max-w-2xl mb-8'>
								Browse our complete catalog of courses. Filter
								by difficulty to find the right fit for your
								level.
							</p>
						</div>

						{/* Filters */}
						<LearningFilters
							selectedDifficulty={selectedDifficulty}
							onDifficultyChange={setSelectedDifficulty}
						/>

						{/* Courses grid */}
						{filteredCourses.length > 0 ? (
							<StaggerContainer className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredCourses.map((course) => (
									<StaggerItem key={course.id}>
										<CourseCard {...course} />
									</StaggerItem>
								))}
							</StaggerContainer>
						) : (
							<div className='text-center py-12 md:py-16 lg:py-20'>
								<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 mb-6'>
									<BookOpen className='w-8 h-8 text-gray-500' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									No courses found
								</h3>
								<p className='text-gray-400'>
									Try adjusting your filters or check back
									later for new courses.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</AnimatedPage>
	);
}
