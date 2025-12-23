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
			{/* Hero Section - Redesigned with split layout */}
			<section className='relative min-h-[calc(100vh-4rem)] flex items-center justify-between overflow-hidden bg-background'>
				{/* Hero Image Background with Overlay */}
				<div className='absolute inset-0'>
					<div
						className='absolute inset-0 bg-cover bg-center opacity-80'
						style={{ backgroundImage: `url(${heroImage})` }}
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80' />
				</div>

				{/* Animated background elements */}
				<div className='absolute inset-0 overflow-hidden'>
					<div className='absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl' />
					<div className='absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl' />
					<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				</div>

				<div className='relative z-10 max-w-7xl mx-auto px-6 lg:px-6 py-20 grid lg:grid-cols-2 gap-24 items-center w-full'>
					{/* Left: Content */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className='space-y-8'>
						<h1 className='text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight'>
							Build Tomorrow's
							<span className='text-primary relative inline-block'>
								Startups
							</span>
							<span> Today</span>
						</h1>

						<p className='text-xl text-muted-foreground/90 leading-relaxed max-w-xl'>
							Join a thriving ecosystem of{' '}
							<span className='text-foreground font-semibold'>
								1000+ entrepreneurs
							</span>{' '}
							who are building, learning, and launching together.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 pt-4'>
							<Button
								asChild
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group'>
								<Link to='/check-eligibility'>
									Check Eligibility
									<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='border-border/50 hover:bg-muted/50 font-semibold text-base px-8 py-6 rounded-xl transition-all duration-300'>
								<Link to='/explore'>Explore Community</Link>
							</Button>
						</div>
					</motion.div>

					{/* Right: Visual Element */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.2,
							ease: 'easeOut',
						}}
						className='relative hidden lg:block'>
						<div className='relative'>
							{/* Main card */}
							<div className='relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl'>
								<div className='space-y-6'>
									{/* Feature items with checkmarks */}
									{[
										'Live workshops with founders',
										'$10K+ in startup credits',
										'Mentorship from experts',
										'Global community access',
									].map((item, i) => (
										<motion.div
											key={item}
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: 0.5 + i * 0.1,
												duration: 0.5,
											}}
											className='flex items-center gap-4 group'>
											<div className='w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors'>
												<div className='w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center'>
													<div className='w-2 h-2 bg-primary rounded-full' />
												</div>
											</div>
											<span className='text-foreground/90 font-medium'>
												{item}
											</span>
										</motion.div>
									))}
								</div>

								{/* Decorative elements */}
								<div className='absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10' />
								<div className='absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-2xl -z-10' />
							</div>

							{/* Floating badge */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									delay: 1,
									duration: 0.5,
								}}
								className='absolute -top-6 -left-6 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30'>
								Free to Join
							</motion.div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Features Grid - Redesigned with bento-style layout */}
			<section className='py-32 px-6 lg:px-12 bg-background relative overflow-hidden'>
				{/* Background decoration */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-border to-transparent' />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-7xl mx-auto'>
					<div className='text-center mb-16 space-y-4'>
						<h2 className='text-4xl md:text-5xl font-display font-bold tracking-tight'>
							Everything You Need
						</h2>
						<p className='text-muted-foreground/80 text-lg max-w-2xl mx-auto'>
							A complete ecosystem to transform your ideas into
							reality
						</p>
					</div>

					{/* Bento grid layout */}
					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: index * 0.1,
									duration: 0.5,
								}}
								className='group'>
								<Link
									to={feature.link}
									className='block h-full'>
									<div className='relative h-full bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] hover:-translate-y-1'>
										{/* Icon with number badge */}
										<div className='mb-6 flex items-start justify-between'>
											<div className='w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300'>
												<feature.icon
													className='w-6 h-6 text-primary'
													strokeWidth={2}
												/>
											</div>
											<div className='text-xs font-mono text-muted-foreground/40'>
												0{index + 1}
											</div>
										</div>

										{/* Content */}
										<h3 className='text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300'>
											{feature.title}
										</h3>
										<p className='text-sm text-muted-foreground/80 leading-relaxed'>
											{feature.description}
										</p>

										{/* Arrow indicator */}
										<div className='mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
											<span>Explore</span>
											<ArrowRight className='ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform' />
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</motion.div>
			</section>

			{/* Social Proof - Redesigned with marquee effect */}
			<section className='py-24 px-6 lg:px-12 bg-subtle-pattern relative border-y border-border/50 overflow-hidden'>
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />

				<div className='max-w-7xl mx-auto relative z-10'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-display font-bold tracking-tight mb-4'>
							Built by Entrepreneurs,
							<br />
							<span className='text-primary'>
								For Entrepreneurs
							</span>
						</h2>
					</motion.div>

					<div className='grid md:grid-cols-3 gap-8'>
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{
									delay: index * 0.15,
									duration: 0.5,
								}}
								className='relative group'>
								<div className='bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:-translate-y-1'>
									{/* Icon */}
									<div className='inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300'>
										<stat.icon
											className='w-8 h-8 text-primary'
											strokeWidth={2}
										/>
									</div>

									{/* Value */}
									<div className='text-5xl md:text-6xl font-display font-bold mb-2'>
										<span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60'>
											{stat.value}
										</span>
									</div>

									{/* Label */}
									<div className='text-muted-foreground/80 text-lg font-medium'>
										{stat.label}
									</div>

									{/* Decorative line */}
									<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-20 transition-all duration-300' />
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Mission Section - Redesigned with visual interest */}
			<section className='py-32 px-6 lg:px-12 bg-background relative'>
				<div className='max-w-7xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-16 items-center'>
						{/* Left: Content */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='space-y-6'>
							<h2 className='text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight'>
								Democratizing Access to{' '}
								<span className='text-primary'>
									Entrepreneurship
								</span>
							</h2>

							<div className='space-y-4 text-lg text-muted-foreground/90 leading-relaxed'>
								<p>
									Great ideas shouldn't fail due to lack of
									resources or guidance. We bridge the gap
									between aspiration and achievement.
								</p>
								<p>
									Through structured learning, exclusive
									perks, and a thriving community, we're
									creating the next generation of successful
									founders.
								</p>
							</div>

							<div className='pt-4'>
								<Button
									asChild
									variant='outline'
									className='group border-border/50 hover:border-primary/30 hover:bg-muted/50'>
									<Link to='/explore'>
										Learn More About Us
										<ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
									</Link>
								</Button>
							</div>
						</motion.div>

						{/* Right: Visual Elements */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className='relative'>
							<div className='space-y-4'>
								{/* Stacked cards for visual interest */}
								{[
									{
										title: 'Learn',
										desc: 'Build skills that matter',
										icon: BookOpen,
									},
									{
										title: 'Connect',
										desc: 'Join a global community',
										icon: Users,
									},
									{
										title: 'Launch',
										desc: 'Turn ideas into reality',
										icon: Rocket,
									},
								].map((item, i) => (
									<motion.div
										key={item.title}
										initial={{ opacity: 0, x: 20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{
											delay: 0.2 + i * 0.1,
											duration: 0.5,
										}}
										className='bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-x-2'>
										<div className='flex items-center gap-4'>
											<div className='w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0'>
												<item.icon
													className='w-6 h-6 text-primary'
													strokeWidth={2}
												/>
											</div>
											<div>
												<h3 className='font-semibold text-lg mb-1'>
													{item.title}
												</h3>
												<p className='text-sm text-muted-foreground/80'>
													{item.desc}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>

							{/* Decorative elements */}
							<div className='absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10' />
							<div className='absolute -bottom-8 -left-8 w-40 h-40 bg-primary/3 rounded-full blur-2xl -z-10' />
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section - Bold and action-oriented */}
			<section className='py-32 px-6 lg:px-12 bg-subtle-pattern relative border-t border-border/50 overflow-hidden'>
				{/* Decorative background */}
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl' />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='max-w-4xl mx-auto text-center relative z-10'>
					{/* Main CTA Card */}
					<div className='bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden'>
						{/* Background decoration */}
						<div className='absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10' />
						<div className='absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl -z-10' />

						<div className='space-y-8'>
							<div className='space-y-4'>
								<h2 className='text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight'>
									Ready to Build the Future?
								</h2>
								<p className='text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed'>
									Join 1000+ entrepreneurs who are already
									building, learning, and growing with StartX.
								</p>
							</div>

							<div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
								<Button
									asChild
									size='lg'
									className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-10 py-7 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 group'>
									<Link to='/check-eligibility'>
										Apply Now - It's Free
										<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
									</Link>
								</Button>
								<Button
									asChild
									size='lg'
									variant='outline'
									className='border-border/50 hover:bg-muted/50 font-semibold text-base px-10 py-7 rounded-xl transition-all duration-300'>
									<Link to='/events'>Browse Events</Link>
								</Button>
							</div>
						</div>
					</div>
				</motion.div>
			</section>
		</div>
	);
}
