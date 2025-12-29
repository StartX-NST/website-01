import { Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
	title?: string;
	message?: string;
	showHomeButton?: boolean;
}

export function ComingSoon({
	title = 'Coming Soon',
	message = "We're working hard to bring you something amazing. Stay tuned!",
	showHomeButton = true,
}: ComingSoonProps) {
	return (
		<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-20'>
			<div className='max-w-md w-full text-center'>
				{/* Icon */}
				<div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6'>
					<Rocket className='w-10 h-10 text-blue-400' />
				</div>

				{/* Title */}
				<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
					{title}
				</h1>

				{/* Message */}
				<p className='text-lg text-gray-400 mb-8 leading-relaxed'>
					{message}
				</p>

				{/* Home Button */}
				{showHomeButton && (
					<Link
						to='/'
						className='inline-block px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)]'>
						Back to Home
					</Link>
				)}
			</div>
		</div>
	);
}
