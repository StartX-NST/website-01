import {
	ArrowRight,
	Calendar,
	BookOpen,
	Gift,
	Compass,
	Users,
	Rocket,
	Target,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedPage, FadeIn } from '@/components/animations';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
	const { isAuthenticated } = useAuth();
	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black'>
				{/* Global continuous grid background */}
				<div className='fixed inset-0 pointer-events-none'>
					<div
						className='absolute inset-0 opacity-[0.03]'
						style={{
							backgroundImage: `
							linear-gradient(to right, #ffffff 1px, transparent 1px),
							linear-gradient(to bottom, #ffffff 1px, transparent 1px)
						`,
							backgroundSize: '80px 80px',
						}}
					/>
				</div>

				{/* Hero Section */}
				<section className='relative min-h-screen flex items-center justify-center overflow-hidden py-20'>
					{/* Background */}
					<div className='absolute inset-0'>
						{/* Emerald spotlight */}
						<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_60%)]' />

						{/* Floating glow orbs - multiple for depth */}
						<div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-emerald-500/15 rounded-full blur-[140px]' />
						<div className='absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-emerald-400/10 rounded-full blur-[100px]' />
						<div className='absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-600/10 rounded-full blur-[110px]' />
					</div>

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
									actually ship
								</span>
							</h1>
						</FadeIn>

						{/* Subtext */}
						<FadeIn delay={0.1}>
							<p className='text-lg md:text-xl text-gray-400 leading-relaxed mb-14 max-w-2xl mx-auto'>
								A founder-led ecosystem for learning, building,
								and launching.
								<br />
								<span className='text-gray-300 font-medium'>
									Join 1000+ builders growing together.
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

				{/* ================= VALUE PILLARS ================= */}
				<section className='relative py-40 px-6 overflow-hidden'>
					{/* Background accent */}
					<div className='absolute top-20 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]' />

					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-24'>
							<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
								Everything you need to move faster
							</h2>
							<p className='text-lg text-gray-400 max-w-2xl mx-auto'>
								Built for founders who want to focus on
								building, not bureaucracy.
							</p>
						</div>

						{/* Cards grid */}
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{[
								{
									icon: Calendar,
									title: 'Events',
									desc: 'Founder sessions, workshops, and private discussions.',
									link: '/events',
								},
								{
									icon: BookOpen,
									title: 'Learn',
									desc: 'Structured learning paths built for real teams.',
									link: '/learn',
								},
								{
									icon: Gift,
									title: 'Perks',
									desc: 'Startup credits, tools, and early-stage advantages.',
									link: '/showcase',
								},
								{
									icon: Compass,
									title: 'Explore',
									desc: 'Discover insights, opportunities, and patterns.',
									link: '/explore',
								},
							].map((item, idx) => (
								<Link
									to={item.link}
									key={item.title}
									className='group relative border border-gray-800 hover:border-emerald-500/40 rounded-2xl p-8 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:bg-emerald-500/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1'
									style={{
										animationDelay: `${idx * 100}ms`,
									}}>
									{/* Icon with glow */}
									<div className='relative inline-flex mb-6'>
										<div className='absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl group-hover:bg-emerald-500/30 transition-all' />
										<div className='relative bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all'>
											<item.icon
												className='w-6 h-6 text-emerald-400 transition-transform group-hover:scale-110 '
												strokeWidth={1.5}
											/>
										</div>
									</div>

									{/* Content */}
									<h3 className='text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors'>
										{item.title}
									</h3>
									<p className='text-sm text-gray-400 leading-relaxed mb-4'>
										{item.desc}
									</p>

									{/* Arrow indicator */}
									<div className='inline-flex items-center text-xs font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity'>
										<span>Learn more</span>
										<ArrowRight className='w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform' />
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* ================= SOCIAL PROOF ================= */}
				<section className='relative py-40 px-6 overflow-hidden'>
					{/* Strategic glow for this section */}
					<div className='absolute inset-0'>
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]' />
					</div>

					<div className='relative z-10 max-w-6xl mx-auto'>
						{/* Stats grid */}
						<div className='grid md:grid-cols-3 gap-12 md:gap-16'>
							{[
								{
									value: '1000+',
									label: 'Active builders',
									sublabel: 'Growing daily',
								},
								{
									value: '50+',
									label: 'Teams scaled',
									sublabel: 'From idea to launch',
								},
								{
									value: '200+',
									label: 'Insights shipped',
									sublabel: 'Actionable knowledge',
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
				<section className='relative py-40 px-6 overflow-hidden'>
					{/* Decorative elements */}
					<div className='absolute left-0 top-1/3 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px]' />
					<div className='absolute right-0 bottom-1/3 w-[300px] h-[300px] bg-emerald-600/5 rounded-full blur-[90px]' />

					<div className='relative z-10 max-w-5xl mx-auto'>
						{/* Section header */}
						<div className='text-center mb-24'>
							<h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
								Designed to stay out of your way
							</h2>
							<p className='text-lg text-gray-400 max-w-2xl mx-auto'>
								Three simple steps to transform how your team
								operates.
							</p>
						</div>

						{/* Steps */}
						<div className='space-y-6'>
							{[
								{
									num: '01',
									title: 'Connect your calls and conversations',
									desc: 'Integrate with your existing tools and workflows seamlessly.',
								},
								{
									num: '02',
									title: 'We analyze and extract what matters',
									desc: 'Our AI processes your data to find patterns and insights.',
								},
								{
									num: '03',
									title: 'You get clear, actionable insights',
									desc: 'Receive organized, ready-to-use information for your team.',
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
					<section className='relative py-40 px-6 overflow-hidden'>
						{/* Strategic glow for CTA section */}
						<div className='absolute inset-0'>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/12 rounded-full blur-[150px] animate-pulse' />
						</div>

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
										Ready to see{' '}
										<br className='hidden md:block' />
										<span className='bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent'>
											how it works?
										</span>
									</h2>
									{/* Description */}
									<p className='text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed'>
										Start using insights your team actually
										trusts. Join hundreds of founders
										building the future.
									</p>
									{/* CTA buttons */}
									<div className='flex flex-wrap items-center justify-center gap-5 mb-10'>
										<Link
											to='/login'
											className='inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base px-12 py-5 rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.2)] group'>
											Get started now
											<ArrowRight
												className='w-5 h-5 group-hover:translate-x-1 transition-transform'
												strokeWidth={2.5}
											/>
										</Link>

										<Link
											to='/showcase'
											className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-semibold text-base px-12 py-5 rounded-full border-2 border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300 backdrop-blur-sm'>
											View showcase
										</Link>
									</div>{' '}
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
											<span>Free trial</span>
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
											<span>No credit card required</span>
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
											<span>Setup in 5 minutes</span>
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
