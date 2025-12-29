import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedPage, FadeIn } from '@/components/animations';
import { useAuth } from '@/contexts/AuthContext';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { ShapesBackground } from '@/components/ui/shape-background';

export default function Home() {
	const { isAuthenticated } = useAuth();
	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black relative'>
				{/* Geometric Shapes Background - Fixed across entire page */}
				<ShapesBackground />

				{/* Hero Section */}
				<section className='relative min-h-screen flex items-center justify-center overflow-hidden py-20 z-10'>
					{/* Content */}
					<div className='relative z-10 max-w-6xl mx-auto px-6 text-center'>
						{/* Headline */}
						<FadeIn>
							<h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8'>
								<span className='text-white'>
									Build startups that
								</span>
								<br />
								<span className='bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent'>
									actually launch
								</span>
							</h1>
						</FadeIn>

						{/* Subtext */}
						<FadeIn delay={0.1}>
							<p className='text-lg md:text-xl text-gray-400 leading-relaxed mb-14 max-w-2xl mx-auto'>
								A student-founder ecosystem for learning,
								building, and shipping.
								<br />
								<span className='text-gray-300 font-medium'>
									Join 1000+ student builders creating the
									future.
								</span>
							</p>
						</FadeIn>

						{/* CTAs */}
						<FadeIn delay={0.2}>
							<div className='flex flex-wrap items-center justify-center gap-5 mb-12'>
								<Link
									to='/check-eligibility'
									className='group inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.2)]'>
									Check eligibility
									<ArrowRight
										className='w-4 h-4 group-hover:translate-x-1 transition-transform'
										strokeWidth={2.5}
									/>
								</Link>

								<Link
									to='/explore'
									className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium text-base px-10 py-4 rounded-full border border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 backdrop-blur-sm'>
									See what members build
								</Link>
							</div>
						</FadeIn>

						{/* Trust badges */}
						<FadeIn delay={0.3}>
							<div className='flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500 font-medium'>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
									<span>No equity</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
									<span>No hidden fees</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
									<span>Free to join</span>
								</div>
							</div>
						</FadeIn>
					</div>
				</section>

				{/* ================= VALUE PILLARS - BENTO GRID ================= */}
				<section className='relative py-40 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-16'>
							<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
								Everything you need to launch faster
							</h2>
							<p className='text-lg text-gray-400 max-w-2xl mx-auto'>
								Built for student founders who want to focus on
								building, not bureaucracy.
							</p>
						</div>

						{/* Bento Grid - Organized 2x3 Pattern */}
						<BentoGrid className='md:grid-cols-4 auto-rows-[16rem]'>
							{/* Row 1: Events (2 cols) + Learn (1 col) + Explore (1 col, spans 2 rows) */}
							<BentoCard
								name='Events & Workshops'
								className='md:col-span-2 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
											alt='Events'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='Connect with student founders through workshops, hackathons, and founder sessions with experienced builders.'
								href='/events'
								cta='Browse events'
							/>

							<BentoCard
								name='Learn to Build'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
											alt='Learn'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='Courses and resources designed for student entrepreneurs.'
								href='/learn'
								cta='Start learning'
							/>

							<BentoCard
								name='Opportunities'
								className='md:col-span-1 md:row-span-2'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80'
											alt='Opportunities'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='Discover internships, competitions, and resources to accelerate your startup journey.'
								href='/explore'
								cta='Explore now'
							/>

							{/* Row 2: Perks (1 col) + Community (1 col) + (Explore continues) */}
							<BentoCard
								name='Resources'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80'
											alt='Resources'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='Tools, credits, and resources for student startups.'
								href='/showcase'
								cta='View resources'
							/>

							<BentoCard
								name='Community'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80'
											alt='Community'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='Join 1000+ student builders creating the future.'
								href='/showcase'
								cta='See projects'
							/>

							<BentoCard
								name='Launch Faster'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
											alt='Launch'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent' />
									</div>
								}
								description='From idea to launch in weeks, not months.'
								href='/learn'
								cta='Get started'
							/>
						</BentoGrid>
					</div>
				</section>

				{/* ================= SOCIAL PROOF ================= */}
				<section className='relative py-40 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-6xl mx-auto'>
						{/* Stats grid */}
						<div className='grid md:grid-cols-3 gap-12 md:gap-16'>
							{[
								{
									value: '1000+',
									label: 'Student builders',
									sublabel: 'Growing every semester',
								},
								{
									value: '50+',
									label: 'Projects launched',
									sublabel: 'From idea to reality',
								},
								{
									value: '20+',
									label: 'Events per semester',
									sublabel: 'Workshops & sessions',
								},
							].map((stat, idx) => (
								<div
									key={stat.label}
									className='group text-center'
									style={{
										animationDelay: `${idx * 150}ms`,
									}}>
									{/* Icon with decorative ring */}
									<div className='relative inline-flex mb-8'>
										<div className='absolute inset-0 rounded-full border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500' />
										<div className='absolute inset-0 rounded-full border border-emerald-500/10 scale-125 group-hover:scale-150 transition-transform duration-700' />
									</div>

									{/* Value */}
									<div className='text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-br from-white via-emerald-100 to-white bg-clip-text text-transparent group-hover:scale-105 transition-transform'>
										{stat.value}
									</div>

									{/* Label */}
									<div className='text-base md:text-lg font-semibold text-white mb-2 uppercase tracking-wide'>
										{stat.label}
									</div>

									{/* Sublabel */}
									<div className='text-sm text-gray-500 font-medium'>
										{stat.sublabel}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ================= HOW IT WORKS ================= */}
				<section className='relative py-40 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-5xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-24'>
							<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
								From idea to launch in 3 steps
							</h2>
							<p className='text-lg text-gray-400 max-w-2xl mx-auto'>
								A simple process designed for student founders.
							</p>
						</div>

						{/* Steps */}
						<div className='space-y-6'>
							{[
								{
									num: '01',
									title: 'Join the community',
									desc: 'Apply for membership and connect with fellow student builders, mentors, and resources.',
								},
								{
									num: '02',
									title: 'Learn and build',
									desc: 'Access workshops, courses, and hands-on events to turn your ideas into reality.',
								},
								{
									num: '03',
									title: 'Launch and grow',
									desc: 'Get support, feedback, and resources to launch your project and scale it.',
								},
							].map((step, idx) => (
								<div
									key={step.num}
									className='group relative'
									style={{
										animationDelay: `${idx * 100}ms`,
									}}>
									{/* Connecting line */}
									{idx < 2 && (
										<div className='absolute left-5 top-16 w-0.5 h-12 bg-gradient-to-b from-emerald-500/30 to-transparent' />
									)}

									<div className='flex items-start gap-6 md:gap-8 border border-gray-800 rounded-xl p-6 md:p-7 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1'>
										{/* Number badge */}
										<div className='flex-shrink-0 relative'>
											<div className='absolute inset-0 bg-emerald-500/20 rounded-full blur-lg group-hover:bg-emerald-500/30 transition-all' />
											<div className='relative w-11 h-11 rounded-full border-2 border-gray-800 group-hover:border-emerald-500/50 bg-gradient-to-br from-black to-emerald-950/20 flex items-center justify-center text-emerald-400 font-bold text-base transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'>
												{step.num}
											</div>
										</div>

										{/* Content */}
										<div className='flex-1 pt-1'>
											<h3 className='text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2'>
												{step.title}
											</h3>
											<p className='text-sm md:text-base text-gray-400 leading-relaxed'>
												{step.desc}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ================= FINAL CTA ================= */}
				{!isAuthenticated && (
					<section className='relative py-40 px-6 overflow-hidden z-10'>
						<div className='relative z-10 max-w-5xl mx-auto'>
							<div className='relative border border-gray-800 rounded-3xl bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm p-12 md:p-20 lg:p-24 overflow-hidden'>
								{/* Decorative corner accents */}
								<div className='absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-emerald-400/30 rounded-tl-3xl' />
								<div className='absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-emerald-400/30 rounded-tr-3xl' />
								<div className='absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-emerald-400/30 rounded-bl-3xl' />
								<div className='absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-emerald-400/30 rounded-br-3xl' />

								{/* Floating decorative elements */}
								<div className='absolute top-10 right-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl' />
								<div className='absolute bottom-10 left-20 w-40 h-40 bg-emerald-600/10 rounded-full blur-3xl' />

								<div className='relative text-center'>
									{/* Heading */}
									<h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight'>
										Ready to build{' '}
										<br className='hidden md:block' />
										<span className='bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent'>
											something great?
										</span>
									</h2>
									{/* Description */}
									<p className='text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
										Join hundreds of student founders
										building the next generation of
										startups. No equity. No fees. Just
										builders helping builders.
									</p>
									{/* CTA buttons */}
									<div className='flex flex-wrap items-center justify-center gap-5 mb-10'>
										<Link
											to='/check-eligibility'
											className='inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.2)] group'>
											Check eligibility
											<ArrowRight
												className='w-5 h-5 group-hover:translate-x-1 transition-transform'
												strokeWidth={2.5}
											/>
										</Link>

										<Link
											to='/showcase'
											className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-semibold text-base px-12 py-5 rounded-full border-2 border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 backdrop-blur-sm'>
											See projects
										</Link>
									</div>
									{/* Trust indicators */}
									<div className='flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500'>
										<div className='flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-emerald-400'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
													clipRule='evenodd'
												/>
											</svg>
											<span>Free to join</span>
										</div>
										<div className='flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-emerald-400'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
													clipRule='evenodd'
												/>
											</svg>
											<span>No equity taken</span>
										</div>
										<div className='flex items-center gap-2'>
											<svg
												className='w-5 h-5 text-emerald-400'
												fill='currentColor'
												viewBox='0 0 20 20'>
												<path
													fillRule='evenodd'
													d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
													clipRule='evenodd'
												/>
											</svg>
											<span>For students only</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
			</div>
		</AnimatedPage>
	);
}
