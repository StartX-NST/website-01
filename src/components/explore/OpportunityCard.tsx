import { Calendar, Clock, MapPin, ExternalLink, Award } from 'lucide-react';
import ProtectedAction from '@/components/auth/ProtectedAction';

interface OpportunityCardProps {
	id: string;
	title: string;
	description: string;
	type: 'internship' | 'challenge' | 'hackathon' | 'accelerator';
	organization: string;
	deadline: string;
	duration?: string;
	location: string;
	stipend?: string;
	link?: string;
}

const typeConfig = {
	internship: { label: 'Internship', color: 'blue' },
	challenge: { label: 'Challenge', color: 'blue' },
	hackathon: { label: 'Hackathon', color: 'blue' },
	accelerator: { label: 'Accelerator', color: 'blue' },
};

export default function OpportunityCard({
	title,
	description,
	type,
	organization,
	deadline,
	duration,
	location,
	stipend,
	link,
}: OpportunityCardProps) {
	const config = typeConfig[type];

	return (
		<ProtectedAction requireMembership={false}>
			<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(19,40,85,0.1)] h-full flex flex-col'>
				<div className='p-6 flex flex-col flex-1'>
					{/* Header with type badge and stipend */}
					<div className='flex items-start justify-between mb-4'>
						<div className='px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm'>
							<span className='text-xs font-semibold uppercase tracking-wider text-blue-400'>
								{config.label}
							</span>
						</div>
						{stipend && (
							<div className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/5 border border-blue-500/10'>
								<Award className='w-3.5 h-3.5 text-blue-400' />
								<span className='text-xs font-semibold text-blue-400'>
									{stipend}
								</span>
							</div>
						)}
					</div>

					{/* Title */}
					<h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2'>
						{title}
					</h3>

					{/* Organization */}
					<p className='text-sm text-gray-400 mb-3'>
						by{' '}
						<span className='font-medium text-gray-300'>
							{organization}
						</span>
					</p>

					{/* Description */}
					<p className='text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3'>
						{description}
					</p>

					{/* Details */}
					<div className='space-y-2.5 mb-6'>
						<div className='flex items-center gap-2.5 text-xs text-gray-400'>
							<Calendar className='w-3.5 h-3.5 text-blue-400 flex-shrink-0' />
							<span>
								Deadline:{' '}
								<span className='text-gray-300'>
									{deadline}
								</span>
							</span>
						</div>
						{duration && (
							<div className='flex items-center gap-2.5 text-xs text-gray-400'>
								<Clock className='w-3.5 h-3.5 text-blue-400 flex-shrink-0' />
								<span>
									Duration:{' '}
									<span className='text-gray-300'>
										{duration}
									</span>
								</span>
							</div>
						)}
						<div className='flex items-center gap-2.5 text-xs text-gray-400'>
							<MapPin className='w-3.5 h-3.5 text-blue-400 flex-shrink-0' />
							<span className='text-gray-300'>{location}</span>
						</div>
					</div>

					{/* CTA - pushed to bottom */}
					<div className='mt-auto'>
						<a
							href={link || '#'}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/cta'>
							<span>Apply now</span>
							<ExternalLink className='w-4 h-4 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform' />
						</a>
					</div>
				</div>
			</div>
		</ProtectedAction>
	);
}
