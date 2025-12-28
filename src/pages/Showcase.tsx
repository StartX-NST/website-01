import { useState } from 'react';
import {
	Sparkles,
	Users,
	Rocket,
	Trophy,
	Target,
	Zap,
	TrendingUp,
	Award,
	DollarSign,
} from 'lucide-react';
import {
	ProjectCard,
	FounderCard,
	AchievementCard,
	ShowcaseFilters,
} from '@/components/showcase';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';

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

// Featured founders data
const foundersData = [
	{
		id: '1',
		name: 'Sarah Chen',
		title: 'Founder, TaskFlow',
		bio: 'Former product manager at Google. Building tools to help teams work better. Passionate about productivity and design.',
		achievement: 'Raised $2M seed round',
	},
	{
		id: '2',
		name: 'Alex Kumar',
		title: 'Founder, CodeMentor AI',
		bio: 'Ex-senior engineer at Meta. Creating AI tools for developers. YC alum and open-source contributor.',
		achievement: 'YC W24 • 10k+ users in 3 months',
	},
	{
		id: '3',
		name: 'Marcus Johnson',
		title: 'Founder, LocalBites',
		bio: 'Serial entrepreneur with a passion for supporting local businesses. Third-time founder with previous exits.',
		achievement: 'Scaled to $50k monthly GMV',
	},
];

// Achievements data
const achievementsData = [
	{
		id: '1',
		title: 'First Million in ARR',
		description:
			'TaskFlow crossed $1M in annual recurring revenue, 18 months after launch.',
		date: 'December 2025',
		icon: DollarSign,
	},
	{
		id: '2',
		title: 'YC Acceptance',
		description:
			'CodeMentor AI accepted into Y Combinator Winter 2024 batch.',
		date: 'November 2025',
		icon: Trophy,
	},
	{
		id: '3',
		title: 'App Store Featured',
		description:
			'FitTrack featured as App of the Day, reaching #1 in Health & Fitness.',
		date: 'October 2025',
		icon: Award,
	},
	{
		id: '4',
		title: '100k Users Milestone',
		description:
			'InsightAI celebrated reaching 100,000 active users across 40 countries.',
		date: 'September 2025',
		icon: Users,
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

	// Stats
	const totalProjects = projectsData.length;
	const totalFounders = foundersData.length;
	const totalAchievements = achievementsData.length;

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black'>
				{/* Featured Projects Section */}
				<section className='relative py-20 px-6 overflow-hidden'>
					<div className='absolute right-0 top-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]' />

					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='mb-8'>
							<div className='flex items-center gap-3 mb-4'>
								<Target className='w-6 h-6 text-emerald-400' />
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
							<div className='text-center py-20'>
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
