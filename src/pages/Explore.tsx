import { useState } from 'react';
import { Briefcase, Trophy } from 'lucide-react';
import { OpportunityCard, ExploreFilters } from '@/components/explore';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';

// Mock opportunities data
const opportunitiesData = [
	{
		id: '1',
		title: 'Product Design Intern',
		description:
			'Join our design team to create intuitive user experiences for our SaaS platform. Work directly with founders and ship features to thousands of users.',
		type: 'internship' as const,
		organization: 'TaskFlow',
		deadline: 'Jan 15, 2026',
		duration: '3 months',
		location: 'Remote',
		stipend: '$2k/month',
		link: 'https://example.com',
	},
	{
		id: '2',
		title: 'Startup Pitch Competition',
		description:
			'Present your startup idea to top investors and win up to $50k in funding. Open to all early-stage founders with innovative solutions.',
		type: 'challenge' as const,
		organization: 'StartX Network',
		deadline: 'Jan 20, 2026',
		location: 'San Francisco, CA',
		stipend: '$50k prize',
		link: 'https://example.com',
	},
	{
		id: '3',
		title: 'AI/ML Hackathon 2026',
		description:
			'Build the next generation of AI applications in 48 hours. Prizes for best implementation, most innovative use case, and best design.',
		type: 'hackathon' as const,
		organization: 'CodeMentor AI',
		deadline: 'Feb 1, 2026',
		duration: '48 hours',
		location: 'Hybrid',
		stipend: '$10k prizes',
		link: 'https://example.com',
	},
	{
		id: '4',
		title: 'Early Stage Accelerator',
		description:
			'12-week intensive program for pre-seed startups. Get mentorship, funding, and access to our network of successful founders and investors.',
		type: 'accelerator' as const,
		organization: 'Velocity Partners',
		deadline: 'Jan 31, 2026',
		duration: '12 weeks',
		location: 'New York, NY',
		stipend: '$150k investment',
		link: 'https://example.com',
	},
	{
		id: '5',
		title: 'Full-Stack Engineering Intern',
		description:
			'Build scalable backend systems and modern frontends. Learn from experienced engineers and contribute to production code from day one.',
		type: 'internship' as const,
		organization: 'InsightAI',
		deadline: 'Feb 10, 2026',
		duration: '6 months',
		location: 'Remote',
		stipend: '$3k/month',
		link: 'https://example.com',
	},
	{
		id: '6',
		title: 'Social Impact Challenge',
		description:
			'Design solutions that create positive social impact. Win grants and mentorship to bring your idea to life and help communities in need.',
		type: 'challenge' as const,
		organization: 'Impact Ventures',
		deadline: 'Feb 15, 2026',
		location: 'Global',
		stipend: '$25k grant',
		link: 'https://example.com',
	},
	{
		id: '7',
		title: 'Web3 Buildathon',
		description:
			'Create decentralized applications on the blockchain. Build with cutting-edge tech and compete for prizes from leading crypto VCs.',
		type: 'hackathon' as const,
		organization: 'Web3 Foundation',
		deadline: 'Jan 25, 2026',
		duration: '72 hours',
		location: 'Online',
		stipend: '$15k prizes',
		link: 'https://example.com',
	},
	{
		id: '8',
		title: 'Climate Tech Accelerator',
		description:
			'For startups solving climate change. Get access to climate experts, investors focused on sustainability, and potential pilot customers.',
		type: 'accelerator' as const,
		organization: 'GreenTech Ventures',
		deadline: 'Feb 20, 2026',
		duration: '16 weeks',
		location: 'Boston, MA',
		stipend: '$200k investment',
		link: 'https://example.com',
	},
];

export default function Explore() {
	const [selectedType, setSelectedType] = useState('all');

	// Filter opportunities based on selected type
	const filteredOpportunities = opportunitiesData.filter((opp) => {
		return selectedType === 'all' || opp.type === selectedType;
	});

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black'>
				{/* Opportunities Section */}
				<section className='relative py-20 px-6 overflow-hidden'>
					<div className='absolute right-0 top-1/3 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]' />

					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='mb-8'>
							<div className='flex items-center gap-3 mb-4'>
								<Trophy className='w-6 h-6 text-emerald-400' />
								<h2 className='text-2xl md:text-3xl font-bold text-white'>
									Active Opportunities
								</h2>
							</div>
							<p className='text-gray-400 max-w-2xl mb-8'>
								Time-bound programs to gain experience, win
								prizes, and grow your skills. Apply before
								deadlines to secure your spot.
							</p>
						</div>

						{/* Filters */}
						<ExploreFilters
							selectedType={selectedType}
							onTypeChange={setSelectedType}
						/>

						{/* Opportunities grid */}
						{filteredOpportunities.length > 0 ? (
							<StaggerContainer className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredOpportunities.map((opportunity) => (
									<StaggerItem key={opportunity.id}>
										<OpportunityCard {...opportunity} />
									</StaggerItem>
								))}
							</StaggerContainer>
						) : (
							<div className='text-center py-20'>
								<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 mb-6'>
									<Briefcase className='w-8 h-8 text-gray-500' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									No opportunities found
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
