import { Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FounderCardProps {
	id: string;
	name: string;
	title: string;
	bio: string;
	achievement: string;
	image?: string;
	link?: string;
}

export default function FounderCard({
	name,
	title,
	bio,
	achievement,
	link,
}: FounderCardProps) {
	return (
		<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]'>
			<div className='p-6'>
				{/* Profile placeholder */}
				<div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center'>
					<span className='text-2xl font-bold text-emerald-400'>
						{name.charAt(0)}
					</span>
				</div>

				{/* Name & Title */}
				<h3 className='text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors'>
					{name}
				</h3>
				<p className='text-sm text-gray-500 mb-4 font-medium'>
					{title}
				</p>

				{/* Bio */}
				<p className='text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3'>
					{bio}
				</p>

				{/* Achievement badge */}
				<div className='flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10'>
					<Award className='w-4 h-4 text-emerald-400 flex-shrink-0' />
					<span className='text-xs text-gray-400 line-clamp-1'>
						{achievement}
					</span>
				</div>

				{/* CTA */}
				<Link
					to={link || '#'}
					className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
					<span>View profile</span>
					<ArrowRight className='w-4 h-4 group-hover/cta:translate-x-1 transition-transform' />
				</Link>
			</div>
		</div>
	);
}
