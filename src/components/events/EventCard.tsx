import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedAction from '@/components/auth/ProtectedAction';

interface EventCardProps {
	id: string;
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	type: 'workshop' | 'talk' | 'panel' | 'competition' | 'networking';
	attendees?: number;
	maxAttendees?: number;
	image?: string;
	status: 'upcoming' | 'ongoing' | 'completed';
}

export default function EventCard({
	title,
	description,
	date,
	time,
	location,
	type,
	attendees,
	maxAttendees,
	status,
}: EventCardProps) {
	const isUpcoming = status === 'upcoming';
	const isCompleted = status === 'completed';

	return (
		<ProtectedAction requireMembership={false}>
			<div
				className={`group relative border rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full flex flex-col min-h-[400px] ${
					isCompleted
						? 'border-gray-800/50 bg-gradient-to-br from-black/90 to-black/70 opacity-60'
						: 'border-gray-800 bg-gradient-to-br from-black/60 to-black/40 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(19,40,85,0.1)]'
				} backdrop-blur-sm`}>
				{/* Status badge */}
				{isCompleted && (
					<div className='absolute top-4 right-4 z-10'>
						<div className='px-3 py-1.5 rounded-full bg-gray-800/60 border border-gray-700/60 backdrop-blur-sm'>
							<span className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
								Completed
							</span>
						</div>
					</div>
				)}

				<div className='p-6 flex flex-col flex-1'>
					{/* Type badge */}
					<div className='inline-flex mb-4'>
						<div className='px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm'>
							<span className='text-xs font-semibold uppercase tracking-wider text-blue-400'>
								{type}
							</span>
						</div>
					</div>
					{/* Title */}
					<h3 className='text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2'>
						{title}
					</h3>
					{/* Description */}
					<p className='text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2'>
						{description}
					</p>
					{/* Event details */}
					<div className='space-y-3 mb-6'>
						<div className='flex items-center gap-2.5 text-sm text-gray-400'>
							<Calendar className='w-4 h-4 text-blue-400 flex-shrink-0' />
							<span>{date}</span>
						</div>
						<div className='flex items-center gap-2.5 text-sm text-gray-400'>
							<Clock className='w-4 h-4 text-blue-400 flex-shrink-0' />
							<span>{time}</span>
						</div>
						<div className='flex items-center gap-2.5 text-sm text-gray-400'>
							<MapPin className='w-4 h-4 text-blue-400 flex-shrink-0' />
							<span>{location}</span>
						</div>
						{attendees !== undefined && maxAttendees && (
							<div className='flex items-center gap-2.5 text-sm text-gray-400'>
								<Users className='w-4 h-4 text-blue-400 flex-shrink-0' />
								<span>
									{attendees}/{maxAttendees} attendees
								</span>
								<div className='flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden ml-2'>
									<div
										className='h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500'
										style={{
											width: `${
												(attendees / maxAttendees) * 100
											}%`,
										}}
									/>
								</div>
							</div>
						)}
					</div>
					{/* CTA - pushed to bottom */}
					<div className='mt-auto'>
						{isUpcoming && (
							<Link
								to='#'
								className='inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/cta'>
								<span>Register now</span>
								<ArrowRight className='w-4 h-4 group-hover/cta:translate-x-1 transition-transform' />
							</Link>
						)}
						{isCompleted && (
							<button className='inline-flex items-center gap-2 text-sm font-semibold text-gray-500 cursor-default'>
								<span>Event ended</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</ProtectedAction>
	);
}
