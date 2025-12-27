import { ArrowRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LearningPathCardProps {
	id: string;
	title: string;
	description: string;
	targetAudience: string;
	courses: number;
	duration: string;
	icon: React.ElementType;
}

export default function LearningPathCard({
	title,
	description,
	targetAudience,
	courses,
	duration,
	icon: Icon,
}: LearningPathCardProps) {
	return (
		<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]'>
			<div className='p-8'>
				{/* Icon with glow */}
				<div className='relative inline-flex mb-6'>
					<div className='absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl group-hover:bg-emerald-500/30 transition-all' />
					<div className='relative bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all'>
						<Icon
							className='w-7 h-7 text-emerald-400 transition-transform group-hover:scale-110'
							strokeWidth={1.5}
						/>
					</div>
				</div>

				{/* Title */}
				<h3 className='text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors'>
					{title}
				</h3>

				{/* Target audience */}
				<div className='inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50'>
					<Target className='w-3.5 h-3.5 text-emerald-400' />
					<span className='text-xs font-medium text-gray-400'>
						{targetAudience}
					</span>
				</div>

				{/* Description */}
				<p className='text-sm text-gray-400 leading-relaxed mb-6'>
					{description}
				</p>

				{/* Path details */}
				<div className='flex items-center gap-4 mb-6 text-sm text-gray-400'>
					<div className='flex items-center gap-1.5'>
						<span className='font-semibold text-emerald-400'>
							{courses}
						</span>
						<span>courses</span>
					</div>
					<div className='w-1 h-1 rounded-full bg-gray-700' />
					<div className='flex items-center gap-1.5'>
						<span className='font-semibold text-emerald-400'>
							{duration}
						</span>
						<span>total</span>
					</div>
				</div>

				{/* CTA */}
				<Link
					to='#'
					className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
					<span>Start this path</span>
					<ArrowRight className='w-4 h-4 group-hover/cta:translate-x-1 transition-transform' />
				</Link>
			</div>
		</div>
	);
}
