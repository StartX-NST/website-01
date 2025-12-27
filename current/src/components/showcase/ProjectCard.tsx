import { ExternalLink, Users, TrendingUp } from 'lucide-react';
import ProtectedAction from '@/components/auth/ProtectedAction';

interface ProjectCardProps {
	id: string;
	title: string;
	description: string;
	founder: string;
	category: string;
	metrics?: {
		label: string;
		value: string;
	};
	image?: string;
	link?: string;
}

export default function ProjectCard({
	title,
	description,
	founder,
	category,
	metrics,
	link,
}: ProjectCardProps) {
	return (
		<ProtectedAction requireMembership={false}>
			<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] h-full flex flex-col'>
				<div className='p-6 flex flex-col flex-1'>
					{/* Category badge */}
					<div className='inline-flex mb-4'>
						<div className='px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm'>
							<span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
								{category}
							</span>
						</div>
					</div>

					{/* Title */}
					<h3 className='text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2'>
						{title}
					</h3>

					{/* Description */}
					<p className='text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3'>
						{description}
					</p>

					{/* Founder */}
					<div className='flex items-center gap-2 mb-4 text-sm text-gray-400'>
						<Users className='w-4 h-4 text-emerald-400 flex-shrink-0' />
						<span>
							Built by{' '}
							<span className='font-medium text-gray-300'>
								{founder}
							</span>
						</span>
					</div>

					{/* Metrics - fixed height to maintain uniformity */}
					<div className='mb-6 h-[42px] flex items-center'>
						{metrics && (
							<div className='flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10'>
								<TrendingUp className='w-4 h-4 text-emerald-400 flex-shrink-0' />
								<span className='text-sm text-gray-400'>
									<span className='font-semibold text-emerald-400'>
										{metrics.value}
									</span>{' '}
									{metrics.label}
								</span>
							</div>
						)}
					</div>

					{/* CTA - pushed to bottom */}
					<div className='mt-auto'>
						{link ? (
							<a
								href={link}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
								<span>View project</span>
								<ExternalLink className='w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform' />
							</a>
						) : (
							<a
								href='#'
								className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
								<span>View project</span>
								<ExternalLink className='w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform' />
							</a>
						)}
					</div>
				</div>
			</div>
		</ProtectedAction>
	);
}
