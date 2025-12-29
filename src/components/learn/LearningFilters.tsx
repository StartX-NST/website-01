interface LearningFiltersProps {
	selectedDifficulty: string;
	onDifficultyChange: (difficulty: string) => void;
}

const difficulties = [
	{ value: 'all', label: 'All Levels' },
	{ value: 'beginner', label: 'Beginner' },
	{ value: 'intermediate', label: 'Intermediate' },
	{ value: 'advanced', label: 'Advanced' },
];

export default function LearningFilters({
	selectedDifficulty,
	onDifficultyChange,
}: LearningFiltersProps) {
	return (
		<div className='flex flex-wrap gap-2 mb-12'>
			{difficulties.map((difficulty) => (
				<button
					key={difficulty.value}
					onClick={() => onDifficultyChange(difficulty.value)}
					className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
						selectedDifficulty === difficulty.value
							? 'bg-blue-500 text-black shadow-[0_0_20px_rgba(19,40,85,0.3)]'
							: 'bg-black/40 text-gray-400 border border-gray-800 hover:border-blue-500/50 hover:text-white'
					}`}>
					{difficulty.label}
				</button>
			))}
		</div>
	);
}
