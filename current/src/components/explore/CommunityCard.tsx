import { Users, ArrowRight } from 'lucide-react';
import ProtectedAction from '@/components/auth/ProtectedAction';

interface CommunityCardProps {
	id: string;
	name: string;
	description: string;
	category: string;
	members: number;
	icon: React.ComponentType<{ className?: string }>;
	active?: boolean;
}

export default function CommunityCard({
	name,
	description,
	category,
	members,
	icon: Icon,
	active = true,
}: CommunityCardProps) {
	return (
		<ProtectedAction requireMembership={false}>
			<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] h-full flex flex-col'>
				<div className='p-6 flex flex-col flex-1'>
					{/* Icon with glow */}
					<div className='relative inline-flex w-fit mb-4'>
						<div className='absolute inset-0 bg-emerald-500/20 rounded-lg blur-xl' />
						<div className='relative bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20'>
							<Icon className='w-6 h-6 text-emerald-400' />
						</div>
					</div>

					{/* Category badge */}
					<div className='inline-flex mb-3 w-fit'>
						<div className='px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm'>
							<span className='text-xs font-semibold uppercase tracking-wider text-emerald-400'>
								{category}
							</span>
						</div>
					</div>

					{/* Title */}
					<h3 className='text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2'>
						{name}
					</h3>

					{/* Description */}
					<p className='text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3'>
						{description}
					</p>

					{/* Stats */}
					<div className='flex items-center gap-4 mb-6'>
						<div className='flex items-center gap-2 text-sm'>
							<Users className='w-4 h-4 text-emerald-400' />
							<span className='text-gray-400'>
								<span className='font-semibold text-emerald-400'>
									{members}
								</span>{' '}
								members
							</span>
						</div>
						{active && (
							<div className='flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20'>
								<div className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
								<span className='text-xs font-medium text-emerald-400'>
									Active
								</span>
							</div>
						)}
					</div>

					{/* CTA - pushed to bottom */}
					<div className='mt-auto'>
						<button className='inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/cta'>
							<span>Join community</span>
							<ArrowRight className='w-4 h-4 group-hover/cta:translate-x-1 transition-transform' />
						</button>
					</div>
				</div>
			</div>
		</ProtectedAction>
	);
}
