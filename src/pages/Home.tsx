import {
	ArrowRight,
	GraduationCap,
	Rocket,
	DollarSign,
	Zap,
	Shield,
	Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedPage, FadeIn } from '@/components/animations';
import { useAuth } from '@/contexts/AuthContext';
import { ShapesBackground } from '@/components/ui/shape-background';
import { BGPattern } from '@/components/ui/bg-pattern';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { Timeline } from '@/components/ui/timeline';

export default function Home() {
	const { isAuthenticated } = useAuth();

	const whyJoin = [
		{
			icon: Zap,
			title: "Build, don't just learn",
			description:
				'Turn ideas into real startups — prototypes, users, traction.',
		},
		{
			icon: Users,
			title: 'Find your tribe',
			description:
				'Meet founders, developers, designers, marketers — collaborate and grow together.',
		},
		{
			icon: GraduationCap,
			title: "Learn from people who've done it",
			description:
				'Workshops, mentor sessions, and guidance from startup builders — not just theory.',
		},
		{
			icon: Rocket,
			title: 'Get visibility & opportunities',
			description:
				'Showcase your startup, join demo days, internships, and startup roles.',
		},
		{
			icon: DollarSign,
			title: 'Support & funding pathways',
			description:
				'Get pitch-ready and unlock micro-grants, competitions, and investor connects.',
		},
		{
			icon: Shield,
			title: 'Safe space to experiment',
			description:
				'Fail fast, iterate, and learn — without pressure or judgment.',
		},
	];

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black relative'>
				{/* Hero Section with Shapes Background */}
				<section className='relative min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-20 z-10'>
					{/* Geometric Shapes Background - Only for hero */}
					<ShapesBackground />

					{/* Content */}
					<div className='relative z-10 max-w-6xl mx-auto px-6 text-center'>
						{/* Headline */}
						<FadeIn>
							<h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8'>
								<span className='text-white'>
									Build startups that
								</span>
								<br />
								<span className='bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent'>
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
									className='group inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-400 text-black font-semibold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(19,40,85,0.5)] hover:scale-105 shadow-[0_0_30px_rgba(19,40,85,0.2)]'>
									Check eligibility
									<ArrowRight
										className='w-4 h-4 group-hover:translate-x-1 transition-transform'
										strokeWidth={2.5}
									/>
								</Link>

								<Link
									to='/opportunities'
									className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium text-base px-10 py-4 rounded-full border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 backdrop-blur-sm'>
									See what members build
								</Link>
							</div>
						</FadeIn>

						{/* Trust badges */}
						<FadeIn delay={0.3}>
							<div className='flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500 font-medium'>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
									<span>No equity</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
									<span>No hidden fees</span>
								</div>
								<div className='flex items-center gap-2'>
									<div className='w-1.5 h-1.5 rounded-full bg-blue-500' />
									<span>Free to join</span>
								</div>
							</div>
						</FadeIn>
					</div>
				</section>

				{/* Continuous Grid Background Pattern for all sections below hero */}
				<div className='absolute inset-0 top-[100vh] z-0'>
					<BGPattern
						variant='grid'
						mask='fade-edges'
						size={60}
						fill='rgba(255, 255, 255, 0.08)'
					/>
				</div>

				{/* ================= KEY FEATURES ================= */}
				<section className='relative py-16 md:py-24 lg:py-32 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-12 md:mb-16 lg:mb-20'>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
								Everything you need to build
							</h2>
							<p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
								From ideation to launch, we provide the tools,
								community, and guidance to turn your startup
								dreams into reality.
							</p>
						</div>

						{/* Bento Grid */}
						<BentoGrid className='md:grid-cols-3 auto-rows-[12rem]'>
							{/* Post Your Startup Idea - Large card */}
							<BentoCard
								name='Post Your Startup Idea'
								className='md:col-span-2 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
											alt='Team collaboration'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Share your idea with the StartX community and tell others what you need — co-founders, devs, designers, or marketers.'
								href='/showcase'
								cta='Share your idea'
							/>

							{/* Join Startup Teams */}
							<BentoCard
								name='Join Startup Teams'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80'
											alt='Join teams'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Browse ideas, join teams, collaborate, and help promising startups grow faster.'
								href='/showcase'
								cta='Browse teams'
							/>

							{/* Roadmap & Progress */}
							<BentoCard
								name='Roadmap & Progress'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
											alt='Roadmap planning'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Get a clear roadmap with milestones and tasks — from idea → prototype → MVP.'
								href='/learn'
								cta='View roadmap'
							/>

							{/* On-Demand Mentorship */}
							<BentoCard
								name='On-Demand Mentorship'
								className='md:col-span-1 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80'
											alt='Mentorship'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Get guidance from mentors at the right stage: validation, tech, GTM, pitching, and more.'
								href='/events'
								cta='Find mentors'
							/>

							{/* Learn & Build - Large card */}
							<BentoCard
								name='Learn & Build (Workshops)'
								className='md:col-span-1 md:row-span-2'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
											alt='Workshops'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Hands-on sessions, founder talks, hackathons, and sprint labs designed to build real startups.'
								href='/events'
								cta='Browse events'
							/>

							{/* Pathway to Funding */}
							<BentoCard
								name='Pathway to Funding'
								className='md:col-span-2 md:row-span-1'
								background={
									<div className='absolute inset-0'>
										<img
											src='https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80'
											alt='Funding opportunities'
											className='w-full h-full object-cover'
										/>
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent' />
									</div>
								}
								description='Prepare your pitch, connect with investors, and apply for StartX funding opportunities.'
								href='/opportunities'
								cta='Explore opportunities'
							/>
						</BentoGrid>
					</div>
				</section>

				{/* ================= WHY JOIN STARTX ================= */}
				<section className='relative py-16 md:py-24 lg:py-32 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-12 md:mb-16 lg:mb-20'>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
								Built for builders, by builders
							</h2>
							<p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
								Join a community where action beats theory, and
								every student founder gets the support they need
								to succeed.
							</p>
						</div>

						{/* Why Join Grid - Modern card design */}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{whyJoin.map((reason, idx) => (
								<div
									key={idx}
									className='group relative overflow-hidden rounded-2xl border border-gray-800/60 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-sm p-8 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-2'>
									{/* Subtle background gradient on hover */}
									<div className='absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

									{/* Minimal icon */}
									<div className='relative mb-6'>
										<div className='relative inline-flex p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 group-hover:border-blue-500/20 transition-all duration-300'>
											<reason.icon
												className='w-6 h-6 text-blue-400/80 group-hover:text-blue-400 transition-colors'
												strokeWidth={1.5}
											/>
										</div>
									</div>

									{/* Content */}
									<div className='relative'>
										<h3 className='text-xl font-semibold text-white mb-3 transition-colors duration-300'>
											{reason.title}
										</h3>
										<p className='text-base text-gray-400 leading-relaxed transition-colors duration-300'>
											{reason.description}
										</p>
									</div>

									{/* Bottom accent line */}
									<div className='absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 group-hover:w-full transition-all duration-700 ease-out' />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* ================= MENTOR-GUIDED GROWTH STAGES ================= */}
				<section className='relative py-8 md:py-20 lg:py-24 px-6 overflow-hidden z-10'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-10 md:mb-14 lg:mb-16'>
							<h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
								Your roadmap from idea to launch
							</h2>
							<p className='text-lg md:text-xl text-gray-400 max-w-3xl mx-auto'>
								Follow a proven path with expert mentorship at
								every critical stage of your startup journey.
							</p>
						</div>

						{/* Timeline Component */}
						<Timeline
							data={[
								{
									title: 'Idea Check',
									content: (
										<div className='mb-8'>
											<div className='bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300'>
												{/* Subtle mono number */}
												<span className='inline-block text-xs font-mono text-gray-500/60 mb-3'>
													01
												</span>

												<h4 className='text-lg font-semibold text-white mb-2'>
													Validate Your Vision
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed'>
													Start with clarity. We help
													you refine your idea, test
													its uniqueness, and validate
													real market need.
												</p>
											</div>
										</div>
									),
								},
								{
									title: 'User Insights',
									content: (
										<div className='mb-8'>
											<div className='bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300'>
												{/* Subtle mono number */}
												<span className='inline-block text-xs font-mono text-gray-500/60 mb-3'>
													02
												</span>

												<h4 className='text-lg font-semibold text-white mb-2'>
													Know Your Customer
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed mb-4'>
													Deep dive into user
													research. Learn to conduct
													interviews, analyze behavior
													patterns, and understand
													what your customers need.
												</p>
												<div className='space-y-2'>
													<div className='flex items-center gap-2 text-gray-400 text-xs'>
														<div className='w-1 h-1 rounded-full bg-blue-400/60' />
														Customer interviews &
														surveys
													</div>
													<div className='flex items-center gap-2 text-gray-400 text-xs'>
														<div className='w-1 h-1 rounded-full bg-blue-400/60' />
														Pain point
														identification
													</div>
													<div className='flex items-center gap-2 text-gray-400 text-xs'>
														<div className='w-1 h-1 rounded-full bg-blue-400/60' />
														Market size validation
													</div>
												</div>
											</div>
										</div>
									),
								},
								{
									title: 'Model & Strategy',
									content: (
										<div className='mb-8'>
											<div className='bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300'>
												{/* Subtle mono number */}
												<span className='inline-block text-xs font-mono text-gray-500/60 mb-3'>
													03
												</span>

												<h4 className='text-lg font-semibold text-white mb-2'>
													Build Your Business Plan
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed'>
													Design a winning strategy.
													From pricing models to
													go-to-market plans, we help
													you create a roadmap that
													actually works.
												</p>
											</div>
										</div>
									),
								},
								{
									title: 'Prototype Sprint',
									content: (
										<div className='mb-8'>
											<div className='bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300'>
												{/* Subtle mono number */}
												<span className='inline-block text-xs font-mono text-gray-500/60 mb-3'>
													04
												</span>

												<h4 className='text-lg font-semibold text-white mb-2'>
													Ship Fast, Learn Faster
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed mb-4'>
													Build your MVP in weeks, not
													months. Get hands-on with
													rapid prototyping, testing,
													and iterating based on real
													user feedback.
												</p>
												<div className='bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 rounded-lg p-4'>
													<p className='text-white font-medium text-sm mb-1'>
														2-4 Week Sprint
													</p>
													<p className='text-gray-400 text-xs'>
														Intensive development
														with mentor check-ins
													</p>
												</div>
											</div>
										</div>
									),
								},
								{
									title: 'Market Entry',
									content: (
										<div className='mb-8'>
											<div className='bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300'>
												{/* Subtle mono number */}
												<span className='inline-block text-xs font-mono text-gray-500/60 mb-3'>
													05
												</span>

												<h4 className='text-lg font-semibold text-white mb-2'>
													Launch & Scale
												</h4>
												<p className='text-sm text-gray-400 leading-relaxed'>
													Perfect your pitch, launch
													to real users, and start
													scaling. Get ready for demo
													days, investor meetings, and
													growth.
												</p>
											</div>
										</div>
									),
								},
							]}
						/>
					</div>
				</section>

				{/* ================= FINAL CTA ================= */}
				{!isAuthenticated && (
					<section className='relative md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-6 overflow-hidden z-10'>
						<div className='relative z-10 max-w-5xl mx-auto'>
							<div className='relative border border-gray-800 rounded-3xl bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm p-8 md:p-12 lg:p-20 overflow-hidden'>
								<div className='relative text-center'>
									<h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight'>
										Ready to build{' '}
										<br className='hidden md:block' />
										<span className='bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent'>
											something great?
										</span>
									</h2>
									<p className='text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
										Join hundreds of student founders
										building the next generation of
										startups. No equity. No fees. Just
										builders helping builders.
									</p>
									<div className='flex flex-wrap items-center justify-center gap-5'>
										<Link
											to='/check-eligibility'
											className='inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-400 text-black font-bold text-base px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(19,40,85,0.5)] hover:scale-105 shadow-[0_0_30px_rgba(19,40,85,0.2)] group'>
											Check eligibility
											<ArrowRight
												className='w-5 h-5 group-hover:translate-x-1 transition-transform'
												strokeWidth={2.5}
											/>
										</Link>

										<Link
											to='/showcase'
											className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-semibold text-base px-12 py-5 rounded-full border-2 border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 backdrop-blur-sm'>
											See projects
										</Link>
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
