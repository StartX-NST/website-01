import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MembershipRequired() {
	return (
		<div className='min-h-screen bg-black flex items-center justify-center p-4'>
			<div className='max-w-md w-full text-center'>
				<div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6'>
					<Lock className='w-10 h-10 text-emerald-400' />
				</div>

				<h1 className='text-3xl font-bold text-white mb-4'>
					Members Only
				</h1>

				<p className='text-gray-400 mb-8 leading-relaxed'>
					This content is available exclusively to StartX members.
					Apply for membership to unlock full access to courses,
					resources, and our founder community.
				</p>

				<div className='flex flex-col gap-3'>
					<Link
						to='/apply-membership'
						className='w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'>
						Apply for Membership
					</Link>

					<Link
						to='/'
						className='w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all'>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
