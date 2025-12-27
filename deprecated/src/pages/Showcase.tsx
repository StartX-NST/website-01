import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const showcase = [
	{
		id: 1,
		title: 'EcoTrack - Carbon Footprint App',
		creator: 'Sarah Chen',
		description:
			'Mobile app that helps users track and reduce their carbon footprint',
		image: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=400',
		category: 'Project',
	},
	{
		id: 2,
		title: 'Featured Founder: Alex Kumar',
		creator: 'Alex Kumar',
		description:
			'Built a profitable SaaS company serving 10,000+ customers',
		image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
		category: 'Founder',
	},
	{
		id: 3,
		title: 'MedAI Diagnostics',
		creator: 'Team MedTech',
		description: 'AI-powered medical diagnosis tool with 95% accuracy',
		image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
		category: 'Startup',
	},
	{
		id: 4,
		title: 'Best Pitch Award 2024',
		creator: 'RoboLearn Team',
		description: 'Won first place at the National Startup Competition',
		image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
		category: 'Achievement',
	},
	{
		id: 5,
		title: 'GreenTech Innovation',
		creator: 'Emma Williams',
		description: 'Sustainable energy solution reducing costs by 40%',
		image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
		category: 'Project',
	},
	{
		id: 6,
		title: 'Featured Founder: Maya Patel',
		creator: 'Maya Patel',
		description: 'Y Combinator graduate building the future of education',
		image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
		category: 'Founder',
	},
];

export default function Showcase() {
	return (
		<div className='min-h-screen py-12 px-6 lg:px-12 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='max-w-7xl mx-auto relative z-10'>
				<div className='mb-16'>
					<div className='flex items-center gap-4 mb-4'>
						<h1 className='text-5xl md:text-6xl font-display font-bold tracking-tight'>
							Showcase
						</h1>
					</div>
					<p className='text-xl text-muted-foreground/90 max-w-2xl leading-relaxed'>
						Featured projects, founders, startups, and achievements
						from our community
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{showcase.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.5 }}>
							<Card className='h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden group'>
								<div className='relative h-48 bg-muted'>
									<img
										src={item.image}
										alt={item.title}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent' />
									<Badge className='absolute top-4 right-4 bg-primary/20 text-primary border-primary/30 backdrop-blur-sm z-10'>
										{item.category}
									</Badge>
								</div>
								<CardHeader>
									<CardTitle className='text-xl font-semibold leading-tight'>
										{item.title}
									</CardTitle>
									<CardDescription className='text-muted-foreground/80'>
										{item.creator}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground/90 leading-relaxed'>
										{item.description}
									</p>
								</CardContent>
								<CardFooter>
									<Button
										variant='outline'
										className='w-full border-border hover:bg-muted/50 hover:text-white transition-all duration-200'>
										Learn More
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
}
