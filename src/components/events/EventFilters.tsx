interface EventFiltersProps {
	selectedType: string;
	selectedStatus: string;
	onTypeChange: (type: string) => void;
	onStatusChange: (status: string) => void;
}

const eventTypes = [
	{ value: 'all', label: 'All Events' },
	{ value: 'workshop', label: 'Workshops' },
	{ value: 'talk', label: 'Talks' },
	{ value: 'panel', label: 'Panels' },
	{ value: 'competition', label: 'Competitions' },
	{ value: 'networking', label: 'Networking' },
];

const eventStatus = [
	{ value: 'all', label: 'All' },
	{ value: 'upcoming', label: 'Upcoming' },
	{ value: 'completed', label: 'Past Events' },
];

export default function EventFilters({
	selectedType,
	selectedStatus,
	onTypeChange,
	onStatusChange,
}: EventFiltersProps) {
	return (
		<div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-12'>
			{/* Type filters */}
			<div className='flex flex-wrap gap-2'>
				{eventTypes.map((type) => (
					<button
						key={type.value}
						onClick={() => onTypeChange(type.value)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
							selectedType === type.value
								? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
								: 'bg-black/40 text-gray-400 border border-gray-800 hover:border-emerald-500/50 hover:text-white'
						}`}>
						{type.label}
					</button>
				))}
			</div>

			{/* Status filters */}
			<div className='flex gap-2'>
				{eventStatus.map((status) => (
					<button
						key={status.value}
						onClick={() => onStatusChange(status.value)}
						className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
							selectedStatus === status.value
								? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/40'
								: 'bg-black/40 text-gray-400 border border-gray-800 hover:border-emerald-500/50 hover:text-white'
						}`}>
						{status.label}
					</button>
				))}
			</div>
		</div>
	);
}
