import { Button } from '@/components/ui/button';
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
			'Founder talks, hands-on workshops, and closed-door networking.',
		link: '/events',
	},
	{
		icon: BookOpen,
		title: 'Learn',
		description:
			'Structured tracks focused on skills founders actually need.',
		link: '/learn',
	},
	{
		icon: Gift,
		title: 'Perks',
		description:
			'Startup credits, discounts, and tools used by real teams.',
		link: '/showcase',
	},
	{
		icon: Compass,
		title: 'Explore',
		description:
			'Discover people, ideas, and early-stage startup projects.',
		link: '/explore',
	},
];

const stats = [
	{ icon: Users, value: '1000+', label: 'Founders & Builders' },
	{ icon: Rocket, value: '50+', label: 'Startups Shipped' },
	{ icon: Target, value: '200+', label: 'Founder Sessions' },
];

export default function Home() {
	return (
		<div className='min-h-screen bg-background'>
			{/* ================= HERO ================= */}
			<section className='relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden'>
				{/* Background */}
				<div className='absolute inset-0'>
					<div
						className='absolute inset-0 bg-cover bg-center opacity-70'
						style={{ backgroundImage: `url(${heroImage})` }}
					/>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80' />
				</div>

				<div className='relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center'>
					{/* Left */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7 }}
						className='space-y-8'>
						<h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]'>
							Build startups that
							<br />
							<span className='text-primary'>actually ship.</span>
						</h1>

						<p className='text-xl text-muted-foreground max-w-xl'>
							Join{' '}
							<span className='text-foreground font-semibold'>
								1000+
							</span>{' '}
							founders learning, building, and launching together.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 pt-2'>
							<Button
								asChild
								size='lg'
								className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl group'>
								<Link to='/check-eligibility'>
									Check eligibility
									<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
								</Link>
							</Button>

							<Button
								asChild
								size='lg'
								variant='outline'
								className='px-8 py-6 rounded-xl'>
								<Link to='/explore'>
									See what members build
								</Link>
							</Button>
						</div>
					</motion.div>

					{/* Right Card */}
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className='hidden lg:block'>
						<div className='bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-2xl'>
							<ul className='space-y-5'>
								{[
									'Weekly founder-led workshops',
									'$10k+ in startup tools & credits',
									'1:1 and group mentorship',
									'Active global founder community',
								].map((item, i) => (
									<motion.li
										key={item}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.3 + i * 0.1 }}
										className='flex items-center gap-4'>
										<div className='w-2 h-2 rounded-full bg-primary' />
										<span className='text-foreground/90'>
											{item}
										</span>
									</motion.li>
								))}
							</ul>

							<p className='mt-8 text-sm text-muted-foreground font-medium'>
								No equity. No hidden fees.
							</p>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ================= FEATURES ================= */}
			<section className='py-32 px-6'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-20 space-y-4'>
						<h2 className='text-4xl md:text-5xl font-bold'>
							An ecosystem — not just resources.
						</h2>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Everything required to go from idea to execution.
						</p>
					</div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.1 }}>
								<Link to={feature.link}>
									<div className='h-full bg-card/30 border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1'>
										<div className='w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6'>
											<feature.icon className='w-6 h-6 text-primary' />
										</div>

										<h3 className='text-xl font-semibold mb-2'>
											{feature.title}
										</h3>
										<p className='text-sm text-muted-foreground leading-relaxed'>
											{feature.description}
										</p>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ================= STATS ================= */}
			<section className='py-28 px-6 border-y border-border/50'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-center text-4xl md:text-5xl font-bold mb-20'>
						Built by founders.
						<br />
						<span className='text-primary'>
							Shaped by the community.
						</span>
					</h2>

					<div className='grid md:grid-cols-3 gap-8'>
						{stats.map((stat, i) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.15 }}
								className='text-center bg-card/30 border border-border/50 rounded-2xl p-8'>
								<div className='inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6'>
									<stat.icon className='w-8 h-8 text-primary' />
								</div>

								<div className='text-5xl font-bold mb-2'>
									{stat.value}
								</div>
								<div className='text-muted-foreground font-medium'>
									{stat.label}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* ================= CTA ================= */}
			<section className='py-32 px-6'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-4xl md:text-5xl font-bold mb-6'>
						Ready to start building?
					</h2>
					<p className='text-lg text-muted-foreground mb-10'>
						Join 1000+ founders already learning and shipping with
						StartX.
					</p>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							asChild
							size='lg'
							className='bg-primary text-primary-foreground px-10 py-7 rounded-xl group'>
							<Link to='/check-eligibility'>
								Apply — it’s free
								<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</Link>
						</Button>

						<Button
							asChild
							size='lg'
							variant='outline'
							className='px-10 py-7 rounded-xl'>
							<Link to='/events'>View upcoming sessions</Link>
						</Button>
					</div>

					<p className='mt-10 text-xs text-muted-foreground font-mono'>
						Last founder onboarded: today
					</p>
				</div>
			</section>
		</div>
	);
}
