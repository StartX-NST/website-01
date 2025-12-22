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
import { BookOpen, Clock, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const courses = [
	{
		id: 1,
		title: 'Startup Fundamentals',
		description:
			'Learn the essential principles of building a startup from scratch.',
		duration: '6 weeks',
		difficulty: 'Beginner',
		modules: 12,
		thumbnail:
			'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
	},
	{
		id: 2,
		title: 'Product Management Essentials',
		description: 'Master the art of building products that customers love.',
		duration: '8 weeks',
		difficulty: 'Intermediate',
		modules: 16,
		thumbnail:
			'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
	},
	{
		id: 3,
		title: 'Growth Marketing',
		description:
			'Scale your startup with proven growth marketing strategies.',
		duration: '5 weeks',
		difficulty: 'Intermediate',
		modules: 10,
		thumbnail:
			'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400',
	},
	{
		id: 4,
		title: 'Fundraising 101',
		description:
			'Navigate the world of venture capital and angel investing.',
		duration: '4 weeks',
		difficulty: 'Advanced',
		modules: 8,
		thumbnail:
			'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
	},
	{
		id: 5,
		title: 'Design Thinking',
		description:
			'Solve complex problems with a human-centered design approach.',
		duration: '6 weeks',
		difficulty: 'Beginner',
		modules: 12,
		thumbnail:
			'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400',
	},
	{
		id: 6,
		title: 'Tech for Non-Tech Founders',
		description:
			'Understand the technical side of building digital products.',
		duration: '7 weeks',
		difficulty: 'Beginner',
		modules: 14,
		thumbnail:
			'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
	},
];

const difficultyColors: Record<string, string> = {
	Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
	Intermediate: 'bg-primary/20 text-primary border-primary/30',
	Advanced: 'bg-accent/20 text-accent border-accent/30',
};

export default function Learn() {
	return (
		<div className='min-h-screen py-12 px-6 lg:px-12 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='max-w-7xl mx-auto relative z-10'>
				<div className='mb-16'>
					<h1 className='text-5xl md:text-6xl font-display font-bold mb-4 tracking-tight'>
						Learn
					</h1>
					<p className='text-xl text-muted-foreground/90 max-w-2xl leading-relaxed'>
						Structured learning tracks to build essential
						entrepreneurial skills
					</p>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20'>
					{courses.map((course, index) => (
						<motion.div
							key={course.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.5 }}>
							<Card className='h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden group'>
								<div className='relative h-48 bg-muted'>
									<img
										src={course.thumbnail}
										alt={course.title}
										className='w-full h-full object-cover'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent' />
									<Badge
										className={`${
											difficultyColors[course.difficulty]
										} absolute top-4 right-4 border backdrop-blur-sm z-10`}>
										{course.difficulty}
									</Badge>
								</div>
								<CardHeader>
									<CardTitle className='text-xl font-semibold leading-tight'>
										{course.title}
									</CardTitle>
									<CardDescription className='text-base text-muted-foreground/80 leading-relaxed'>
										{course.description}
									</CardDescription>
								</CardHeader>
								<CardContent className='space-y-2.5'>
									<div className='flex items-center gap-2.5 text-muted-foreground/90 text-sm'>
										<Clock
											className='w-4 h-4 text-primary'
											strokeWidth={1.5}
										/>
										<span>{course.duration}</span>
									</div>
									<div className='flex items-center gap-2.5 text-muted-foreground/90 text-sm'>
										<BookOpen
											className='w-4 h-4 text-primary'
											strokeWidth={1.5}
										/>
										<span>{course.modules} modules</span>
									</div>
								</CardContent>
								<CardFooter>
									<Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-200 hover:shadow-md hover:shadow-primary/20'>
										Start Learning
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>

				{/* Learning Paths Section */}
				<section className='mt-20'>
					<div className='mb-10'>
						<h2 className='text-3xl md:text-4xl font-display font-bold tracking-tight'>
							Recommended Learning Paths
						</h2>
					</div>
					<div className='grid md:grid-cols-3 gap-6'>
						<Card className='bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
							<CardHeader className='relative z-10'>
								{/* Clean icon with subtle accent line */}
								<div className='mb-6 flex items-start gap-3'>
									<div className='relative'>
										<BarChart
											className='w-7 h-7 text-primary group-hover:text-primary/90 transition-colors duration-300'
											strokeWidth={1.5}
										/>
									</div>
									<div className='flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent mt-3 group-hover:from-primary/40 transition-all duration-300' />
								</div>
								<CardTitle className='text-xl font-semibold'>
									First-Time Founder
								</CardTitle>
								<CardDescription className='text-muted-foreground/80 leading-relaxed'>
									Perfect for those taking their first steps
									into entrepreneurship
								</CardDescription>
							</CardHeader>
							<CardContent className='relative z-10'>
								<ul className='space-y-2.5 text-sm text-muted-foreground/90'>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Startup Fundamentals
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Design Thinking
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Product Management Essentials
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card className='bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
							<CardHeader className='relative z-10'>
								{/* Clean icon with subtle accent line */}
								<div className='mb-6 flex items-start gap-3'>
									<div className='relative'>
										<BarChart
											className='w-7 h-7 text-primary group-hover:text-primary/90 transition-colors duration-300'
											strokeWidth={1.5}
										/>
									</div>
									<div className='flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent mt-3 group-hover:from-primary/40 transition-all duration-300' />
								</div>
								<CardTitle className='text-xl font-semibold'>
									Growth Focused
								</CardTitle>
								<CardDescription className='text-muted-foreground/80 leading-relaxed'>
									For founders ready to scale their startups
								</CardDescription>
							</CardHeader>
							<CardContent className='relative z-10'>
								<ul className='space-y-2.5 text-sm text-muted-foreground/90'>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Growth Marketing
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Fundraising 101
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Product Management Essentials
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card className='bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
							<CardHeader className='relative z-10'>
								{/* Clean icon with subtle accent line */}
								<div className='mb-6 flex items-start gap-3'>
									<div className='relative'>
										<BarChart
											className='w-7 h-7 text-primary group-hover:text-primary/90 transition-colors duration-300'
											strokeWidth={1.5}
										/>
									</div>
									<div className='flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent mt-3 group-hover:from-primary/40 transition-all duration-300' />
								</div>
								<CardTitle className='text-xl font-semibold'>
									Technical Builder
								</CardTitle>
								<CardDescription className='text-muted-foreground/80 leading-relaxed'>
									For those who want to understand the tech
									side
								</CardDescription>
							</CardHeader>
							<CardContent className='relative z-10'>
								<ul className='space-y-2.5 text-sm text-muted-foreground/90'>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Tech for Non-Tech Founders
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Product Management Essentials
									</li>
									<li className='flex items-center gap-2'>
										<div className='w-1.5 h-1.5 rounded-full bg-primary' />
										Startup Fundamentals
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</section>
			</motion.div>
		</div>
	);
}
