interface ExploreFiltersProps {
	selectedType: string;
	onTypeChange: (type: string) => void;
}

const filterOptions = [
	{ value: 'all', label: 'All' },
	{ value: 'internship', label: 'Internships' },
	{ value: 'challenge', label: 'Challenges' },
	{ value: 'hackathon', label: 'Hackathons' },
	{ value: 'accelerator', label: 'Accelerators' },
];

export default function ExploreFilters({
	selectedType,
	onTypeChange,
}: ExploreFiltersProps) {
	return (
		<div className='flex flex-wrap gap-3 mb-8'>
			{filterOptions.map((option) => (
				<button
					key={option.value}
					onClick={() => onTypeChange(option.value)}
					className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
						selectedType === option.value
							? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
							: 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700 hover:border-gray-600'
					}`}>
					{option.label}
				</button>
			))}
		</div>
	);
}
