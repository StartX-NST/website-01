interface ShowcaseFiltersProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
}

const categories = [
	{ value: 'all', label: 'All Projects' },
	{ value: 'saas', label: 'SaaS' },
	{ value: 'marketplace', label: 'Marketplace' },
	{ value: 'ai', label: 'AI/ML' },
	{ value: 'fintech', label: 'Fintech' },
	{ value: 'consumer', label: 'Consumer' },
];

export default function ShowcaseFilters({
	selectedCategory,
	onCategoryChange,
}: ShowcaseFiltersProps) {
	return (
		<div className='flex flex-wrap gap-2 mb-12'>
			{categories.map((category) => (
				<button
					key={category.value}
					onClick={() => onCategoryChange(category.value)}
					className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
						selectedCategory === category.value
							? 'bg-blue-500 text-black shadow-[0_0_20px_rgba(19,40,85,0.3)]'
							: 'bg-black/40 text-gray-400 border border-gray-800 hover:border-blue-500/50 hover:text-white'
					}`}>
					{category.label}
				</button>
			))}
		</div>
	);
}
