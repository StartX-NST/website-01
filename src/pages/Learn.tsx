import { AnimatedPage } from '@/components/animations';
import { BGPattern } from '@/components/ui/bg-pattern';

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
			<div className='min-h-screen bg-black relative'>
				{/* Diagonal Stripes Background Pattern */}
				<BGPattern
					variant='diagonal-stripes'
					mask='fade-y'
					size={60}
					fill='rgba(255, 255, 255, 0.08)'
				/>

				{/* Empty State */}
				<section className='relative py-12 md:py-16 lg:py-20 px-6 overflow-hidden'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{coursesData.length === 0 ? (
							<div className='flex items-center justify-center min-h-[60vh]'>
								<div className='text-center max-w-md'>
									<h2 className='text-2xl md:text-3xl font-bold text-white mb-3'>
										Coming Soon
									</h2>
									<p className='text-gray-400 text-lg'>
										Learning resources and courses will be
										available here soon!
									</p>
								</div>
							</div>
						) : (
							<>
								{/* Commented out full content for when data exists */}
								{/* 
								<div className='mb-8'>
									<div className='flex items-center gap-3 mb-4'>
										<BookOpen className='w-6 h-6 text-blue-400' />
										<h2 className='text-2xl md:text-3xl font-bold text-white'>
											All Courses
										</h2>
									</div>
								</div>

								<LearningFilters
									selectedDifficulty={selectedDifficulty}
									onDifficultyChange={setSelectedDifficulty}
								/>

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
										<h3 className='text-xl font-semibold text-white mb-2'>
											No courses found
										</h3>
										<p className='text-gray-400'>
											Try selecting a different difficulty level to see more courses.
										</p>
									</div>
								)}
								*/}
							</>
						)}
					</div>
				</section>
			</div>
		</AnimatedPage>
	);
}
