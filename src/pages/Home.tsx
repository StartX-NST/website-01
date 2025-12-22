import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Calendar,
	BookOpen,
	Gift,
	Compass,
	ArrowRight,
	Users,
	Rocket,
	Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-main.jpg';

const features = [
	{
		icon: Calendar,
		title: 'Events',
		description:
			'Access workshops, talks, and networking sessions with industry leaders',
		link: '/events',
	},
	{
		icon: BookOpen,
		title: 'Learn',
		description:
			'Structured learning tracks to build essential entrepreneurial skills',
		link: '/learn',
	},
	{
		icon: Gift,
		title: 'Perks',
		description:
			'Exclusive discounts on tools, services, and resources for startups',
		link: '/showcase',
	},
	{
		icon: Compass,
		title: 'Explore',
		description:
			'Discover opportunities, communities, and showcase your work',
		link: '/explore',
	},
];

const stats = [
	{ icon: Users, value: '1000+', label: 'Active Members' },
	{ icon: Rocket, value: '50+', label: 'Startups Launched' },
	{ icon: Target, value: '200+', label: 'Events Hosted' },
];

export default function Home() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<section className='relative h-screen flex items-center justify-center overflow-hidden'>
				<div
					className='absolute inset-0 bg-cover bg-center'
					style={{ backgroundImage: `url(${heroImage})` }}>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60' />
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className='relative z-10 max-w-5xl mx-auto px-6 text-center lg:text-left lg:px-12'>
					<h1 className='text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[1.1] tracking-tight'>
						Build your entrepreneurial journey with{' '}
						<span className='text-primary glow-text-subtle'>
							STARTX
						</span>
					</h1>
					<p className='text-lg md:text-xl lg:text-2xl text-muted-foreground/90 mb-10 max-w-2xl leading-relaxed'>
						Access real learning, events, perks, and opportunities
						in one ecosystem.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 items-center lg:items-start'>
						<Button
							asChild
							size='lg'
							className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105'>
							<Link to='/check-eligibility'>
								Check Eligibility{' '}
								<ArrowRight className='ml-2 w-5 h-5' />
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-border hover:bg-muted/50 hover:text-white font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300'>
							<Link to='/explore'>Learn More</Link>
						</Button>
					</div>
				</motion.div>
			</section>

			{/* What is STARTX */}
			<section className='py-24 px-6 lg:px-12 bg-subtle-pattern relative'>
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-4xl mx-auto text-center relative z-10'>
					<h2 className='text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight'>
						What is <span className='text-primary'>STARTX</span>?
					</h2>
					<p className='text-lg md:text-xl text-muted-foreground/90 leading-relaxed'>
						STARTX is a comprehensive ecosystem designed to empower
						aspiring entrepreneurs and innovators. We provide the
						resources, connections, and opportunities you need to
						transform your ideas into successful ventures. From
						hands-on learning to exclusive perks and a vibrant
						community, STARTX is your launchpad for entrepreneurial
						success.
					</p>
				</motion.div>
			</section>

			{/* Features Grid */}
			<section className='py-24 px-6 lg:px-12 bg-background'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-7xl mx-auto'>
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight'>
							What You Get
						</h2>
						<p className='text-muted-foreground/80 text-lg max-w-2xl mx-auto'>
							Everything you need to succeed on your
							entrepreneurial journey
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: index * 0.1,
									duration: 0.5,
								}}>
								<Link
									to={feature.link}
									className='block h-full'>
									<Card className='h-full hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 group relative overflow-hidden'>
										<div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

										<CardHeader className='relative z-10 pb-4'>
											{/* Clean icon with subtle accent line */}
											<div className='mb-6 flex items-start gap-3'>
												<div className='relative'>
													<feature.icon
														className='w-7 h-7 text-primary group-hover:text-primary/90 transition-colors duration-300'
														strokeWidth={1.5}
													/>
												</div>
												<div className='flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent mt-3 group-hover:from-primary/40 transition-all duration-300' />
											</div>
											<CardTitle className='text-xl font-semibold'>
												{feature.title}
											</CardTitle>
										</CardHeader>
										<CardContent className='relative z-10'>
											<CardDescription className='text-muted-foreground/80 leading-relaxed'>
												{feature.description}
											</CardDescription>
										</CardContent>
									</Card>
								</Link>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* Stats Section */}
			<section className='py-24 px-6 lg:px-12 bg-subtle-pattern relative border-y border-border/50'>
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				<div className='max-w-6xl mx-auto relative z-10'>
					<div className='grid md:grid-cols-3 gap-12 md:gap-8'>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: index * 0.15,
									duration: 0.5,
								}}
								className='text-center group'>
								<div className='inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300'>
									<stat.icon className='w-10 h-10 text-primary' />
								</div>
								<div className='text-5xl md:text-6xl font-display font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300'>
									{stat.value}
								</div>
								<div className='text-muted-foreground/80 text-lg font-medium'>
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Why STARTX Exists */}
			<section className='py-24 px-6 lg:px-12 bg-background'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 tracking-tight'>
						Why <span className='text-primary'>STARTX</span> Exists
					</h2>
					<div className='space-y-6 text-lg md:text-xl text-muted-foreground/90 leading-relaxed'>
						<p>
							We believe that great ideas shouldn't fail due to
							lack of resources or guidance. STARTX was created to
							bridge the gap between aspiration and achievement,
							providing a structured path for students and young
							entrepreneurs to learn, grow, and build.
						</p>
						<p>
							Our mission is to democratize access to
							entrepreneurial education and create a thriving
							community where innovation flourishes and dreams
							become reality.
						</p>
					</div>
				</motion.div>
			</section>

			{/* CTA Section */}
			<section className='py-24 px-6 lg:px-12 bg-subtle-pattern relative border-t border-border/50'>
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-4xl mx-auto text-center relative z-10'>
					<h2 className='text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight'>
						Ready to <span className='text-primary'>Start</span>?
					</h2>
					<p className='text-lg md:text-xl text-muted-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed'>
						Join the STARTX community and begin your entrepreneurial
						journey today.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Button
							asChild
							size='lg'
							className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105'>
							<Link to='/check-eligibility'>
								Check Your Eligibility{' '}
								<ArrowRight className='ml-2 w-5 h-5' />
							</Link>
						</Button>
						<Button
							asChild
							size='lg'
							variant='outline'
							className='border-border hover:bg-muted/50 hover:text-white font-semibold text-base px-8 py-6 rounded-lg transition-all duration-300'>
							<Link to='/events'>Explore Events</Link>
						</Button>
					</div>
				</motion.div>
			</section>
		</div>
	);
}
