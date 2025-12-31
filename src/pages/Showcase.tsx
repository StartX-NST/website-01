import { useState } from 'react';
import { Rocket, Target } from 'lucide-react';
import { ProjectCard, ShowcaseFilters } from '@/components/showcase';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';
import { BGPattern } from '@/components/ui/bg-pattern';

// Mock projects data
const projectsData = [
	{
		id: '1',
		title: 'TaskFlow',
		description:
			'AI-powered project management tool that helps teams stay organized and productive. Built with modern tech stack and shipped in 6 weeks.',
		founder: 'Sarah Chen',
		category: 'saas',
		metrics: {
			label: 'active users',
			value: '2.5k',
		},
		link: 'https://example.com',
	},
	{
		id: '2',
		title: 'LocalBites',
		description:
			'Connecting local food vendors with customers through a seamless marketplace experience. Growing 40% month-over-month.',
		founder: 'Marcus Johnson',
		category: 'marketplace',
		metrics: {
			label: 'monthly GMV',
			value: '$50k',
		},
	},
	{
		id: '3',
		title: 'CodeMentor AI',
		description:
			'AI coding assistant that learns your codebase and provides context-aware suggestions. Backed by YC.',
		founder: 'Alex Kumar',
		category: 'ai',
		metrics: {
			label: 'developers using',
			value: '10k+',
		},
		link: 'https://example.com',
	},
	{
		id: '4',
		title: 'PaySplit',
		description:
			'Simple expense splitting for roommates and groups. Making shared finances stress-free with automated reminders.',
		founder: 'Emma Martinez',
		category: 'fintech',
		metrics: {
			label: 'transactions processed',
			value: '100k+',
		},
	},
	{
		id: '5',
		title: 'FitTrack',
		description:
			'Personal fitness companion that adapts to your goals and lifestyle. Featured in App Store top charts.',
		founder: 'David Park',
		category: 'consumer',
		metrics: {
			label: 'daily active users',
			value: '15k',
		},
		link: 'https://example.com',
	},
	{
		id: '6',
		title: 'InsightAI',
		description:
			'Turn customer feedback into actionable insights using advanced NLP. Helping B2B companies understand their users better.',
		founder: 'Lisa Wang',
		category: 'ai',
		metrics: {
			label: 'paying customers',
			value: '50+',
		},
	},
	{
		id: '7',
		title: 'SupplyChain Pro',
		description:
			'End-to-end supply chain management platform for small businesses. Reducing logistics costs by an average of 30%.',
		founder: 'James Rodriguez',
		category: 'saas',
		metrics: {
			label: 'businesses served',
			value: '200+',
		},
	},
	{
		id: '8',
		title: 'StudyBuddy',
		description:
			'Peer-to-peer learning platform connecting students worldwide. Built during college, now serving 50k+ students.',
		founder: 'Rachel Kim',
		category: 'consumer',
		metrics: {
			label: 'study sessions',
			value: '500k+',
		},
		link: 'https://example.com',
	},
];

export default function Showcase() {
	const [selectedCategory, setSelectedCategory] = useState('all');

	// Filter projects based on selected category
	const filteredProjects = projectsData.filter((project) => {
		return (
			selectedCategory === 'all' || project.category === selectedCategory
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

				{/* Featured Projects Section */}
				<section className='relative py-20 px-6 overflow-hidden'>
					<div className='absolute right-0 top-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]' />

					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='mb-8'>
							<div className='flex items-center gap-3 mb-4'>
								<Target className='w-6 h-6 text-blue-400' />
								<h2 className='text-2xl md:text-3xl font-bold text-white'>
									Featured Projects
								</h2>
							</div>
							<p className='text-gray-400 max-w-2xl mb-8'>
								Startups and projects built by our community
								members. Real products solving real problems.
							</p>
						</div>

						{/* Filters */}
						<ShowcaseFilters
							selectedCategory={selectedCategory}
							onCategoryChange={setSelectedCategory}
						/>

						{/* Projects grid */}
						{filteredProjects.length > 0 ? (
							<StaggerContainer className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredProjects.map((project) => (
									<StaggerItem key={project.id}>
										<ProjectCard {...project} />
									</StaggerItem>
								))}
							</StaggerContainer>
						) : (
							<div className='text-center py-12 md:py-16 lg:py-20'>
								<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 mb-6'>
									<Rocket className='w-8 h-8 text-gray-500' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									No projects found
								</h3>
								<p className='text-gray-400'>
									Try adjusting your filters or check back
									later.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</AnimatedPage>
	);
}
