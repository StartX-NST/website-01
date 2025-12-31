import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CheckEligibility() {
	return (
		<div className='min-h-screen bg-black flex items-center justify-center p-4'>
			<div className='w-full max-w-2xl'>
				{/* Header */}
				<div className='text-center mb-12'>
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						Join StartX
					</h1>
					<p className='text-gray-400'>
						Check if you're eligible to join our student-founder
						ecosystem
					</p>
				</div>

				{/* Eligibility Card */}
				<div className='bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl mb-6'>
					<h2 className='text-xl font-bold text-white mb-6'>
						Who can join?
					</h2>

					<div className='space-y-3'>
						{[
							{
								title: 'Current Students',
								desc: 'Enrolled in any university or college program',
							},
							{
								title: 'Aspiring Founders',
								desc: 'Have an idea or actively building a project/startup',
							},
							{
								title: 'Ready to Build',
								desc: 'Committed to learning and shipping your ideas',
							},
							{
								title: 'Team Players',
								desc: 'Willing to contribute to and learn from the community',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/20 transition-colors'>
								<div className='flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5'>
									<div className='w-2 h-2 rounded-full bg-blue-400' />
								</div>
								<div className='flex-1 min-w-0'>
									<h3 className='text-white font-semibold text-sm mb-1'>
										{item.title}
									</h3>
									<p className='text-xs text-gray-400'>
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className='text-center'>
					<p className='text-sm text-gray-400 mb-5'>
						If you meet the criteria above, you're eligible to
						apply!
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
						<Link
							to='/apply-membership'
							className='w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-black font-semibold text-sm px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)]'>
							Apply for membership
							<ArrowRight
								className='w-4 h-4'
								strokeWidth={2.5}
							/>
						</Link>
						<Link
							to='/'
							className='w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-300 hover:text-white font-medium text-sm px-8 py-3 rounded-lg border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300'>
							Back to home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
