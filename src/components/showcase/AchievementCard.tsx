interface AchievementCardProps {
	id: string;
	title: string;
	description: string;
	date: string;
	icon: React.ElementType;
}

export default function AchievementCard({
	title,
	description,
	date,
	icon: Icon,
}: AchievementCardProps) {
	return (
		<div className='group relative border border-gray-800 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]'>
			<div className='p-6'>
				{/* Icon with glow */}
				<div className='relative inline-flex mb-4'>
					<div className='absolute inset-0 bg-emerald-500/20 rounded-lg blur-lg group-hover:bg-emerald-500/30 transition-all' />
					<div className='relative bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all'>
						<Icon
							className='w-6 h-6 text-emerald-400 transition-transform group-hover:scale-110'
							strokeWidth={1.5}
						/>
					</div>
				</div>

				{/* Title */}
				<h3 className='text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors'>
					{title}
				</h3>

				{/* Description */}
				<p className='text-sm text-gray-400 leading-relaxed mb-4'>
					{description}
				</p>

				{/* Date */}
				<div className='text-xs text-gray-500 font-medium'>{date}</div>
			</div>
		</div>
	);
}
