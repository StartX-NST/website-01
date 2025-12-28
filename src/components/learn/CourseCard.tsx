import {
	Clock,
	BarChart,
	BookOpen,
	ArrowRight,
	CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedAction from '@/components/auth/ProtectedAction';

interface CourseCardProps {
	id: string;
	title: string;
	description: string;
	duration: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	modules: number;
	enrolled?: number;
	completed?: boolean;
}

const difficultyColors = {
	beginner: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
	intermediate: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
	advanced: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

export default function CourseCard({
	title,
	description,
	duration,
	difficulty,
	modules,
	enrolled,
	completed = false,
}: CourseCardProps) {
	return (
		<ProtectedAction requireMembership={true}>
			<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]'>
				{/* Completed badge */}
				{completed && (
					<div className='absolute top-4 right-4 z-10'>
						<div className='px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm flex items-center gap-1.5'>
							<CheckCircle className='w-3.5 h-3.5 text-emerald-400' />
							<span className='text-xs font-semibold text-emerald-400 uppercase tracking-wider'>
								Completed
							</span>
						</div>
					</div>
				)}

				<div className='p-6'>
					{/* Difficulty badge */}
					<div className='inline-flex mb-4'>
						<div
							className={`px-3 py-1.5 rounded-lg border backdrop-blur-sm ${difficultyColors[difficulty]}`}>
							<span className='text-xs font-semibold uppercase tracking-wider'>
								{difficulty}
							</span>
						</div>
					</div>

					{/* Title */}
					<h3 className='text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2'>
						{title}
					</h3>

					{/* Description */}
					<p className='text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2'>
						{description}
					</p>

					{/* Course details */}
					<div className='flex items-center gap-4 mb-6 text-sm text-gray-400'>
						<div className='flex items-center gap-1.5'>
							<Clock className='w-4 h-4 text-emerald-400 flex-shrink-0' />
							<span>{duration}</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<BookOpen className='w-4 h-4 text-emerald-400 flex-shrink-0' />
							<span>{modules} modules</span>
						</div>
						{enrolled && (
							<div className='flex items-center gap-1.5'>
								<BarChart className='w-4 h-4 text-emerald-400 flex-shrink-0' />
								<span>{enrolled} enrolled</span>
							</div>
						)}
					</div>

					{/* CTA */}
					<Link
						to='#'
						className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
						<span>
							{completed ? 'Review course' : 'Start learning'}
						</span>
						<ArrowRight className='w-4 h-4 group-hover/cta:translate-x-1 transition-transform' />
					</Link>
				</div>
			</div>
		</ProtectedAction>
	);
}
