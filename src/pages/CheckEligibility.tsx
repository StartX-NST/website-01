import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function CheckEligibility() {
	return (
		<div className='min-h-screen bg-black flex items-center justify-center p-6'>
			<div className='max-w-3xl w-full'>
				{/* Header */}
				<div className='text-center mb-12'>
					<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6'>
						<CheckCircle className='w-8 h-8 text-emerald-400' />
					</div>
					<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
						Join StartX
					</h1>
					<p className='text-lg text-gray-400'>
						StartX is a student-founder ecosystem. Check if you're
						eligible to join our community.
					</p>
				</div>

				{/* Eligibility Criteria */}
				<div className='border border-gray-800 rounded-2xl p-8 md:p-10 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm mb-8'>
					<h2 className='text-2xl font-bold text-white mb-6'>
						Who can join?
					</h2>

					<div className='space-y-4'>
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
								className='flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/20 transition-colors'>
								<div className='flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-0.5'>
									<CheckCircle className='w-4 h-4 text-emerald-400' />
								</div>
								<div>
									<h3 className='text-white font-semibold mb-1'>
										{item.title}
									</h3>
									<p className='text-sm text-gray-400'>
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA Section */}
				<div className='text-center'>
					<p className='text-gray-400 mb-6'>
						If you meet the criteria above, you're eligible to
						apply!
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
						<Link
							to='/apply-membership'
							className='inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base px-10 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 shadow-[0_0_25px_rgba(16,185,129,0.2)]'>
							Apply for membership
							<ArrowRight
								className='w-5 h-5'
								strokeWidth={2.5}
							/>
						</Link>
						<Link
							to='/'
							className='inline-flex items-center gap-2 text-gray-300 hover:text-white font-medium text-base px-10 py-4 rounded-full border border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300'>
							Back to home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
