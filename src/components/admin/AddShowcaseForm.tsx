import { useState } from 'react';
import { Plus, CheckCircle } from 'lucide-react';

interface ShowcaseFormData {
	title: string;
	description: string;
	founder: string;
	category: string;
	metricsLabel: string;
	metricsValue: string;
	link: string;
}

export default function AddShowcaseForm() {
	const [formData, setFormData] = useState<ShowcaseFormData>({
		title: '',
		description: '',
		founder: '',
		category: 'saas',
		metricsLabel: '',
		metricsValue: '',
		link: '',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const categories = [
		{ value: 'saas', label: 'SaaS' },
		{ value: 'marketplace', label: 'Marketplace' },
		{ value: 'ai', label: 'AI' },
		{ value: 'fintech', label: 'Fintech' },
		{ value: 'consumer', label: 'Consumer' },
		{ value: 'other', label: 'Other' },
	];

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// In a real app, this would send data to backend
		console.log('New showcase project:', formData);

		setLoading(false);
		setSuccess(true);

		// Reset form
		setFormData({
			title: '',
			description: '',
			founder: '',
			category: 'saas',
			metricsLabel: '',
			metricsValue: '',
			link: '',
		});

		// Hide success message after 3 seconds
		setTimeout(() => setSuccess(false), 3000);
	};

	return (
		<div>
			<h2 className='text-2xl font-bold text-white mb-6'>
				Add New Showcase Project
			</h2>

			{success && (
				<div className='mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3'>
					<CheckCircle className='w-5 h-5 text-blue-400' />
					<span className='text-blue-400 font-medium'>
						Project added successfully!
					</span>
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className='space-y-6'>
				{/* Title */}
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Project Title *
					</label>
					<input
						type='text'
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='e.g., TaskFlow'
					/>
				</div>

				{/* Description */}
				<div>
					<label
						htmlFor='description'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Description *
					</label>
					<textarea
						id='description'
						name='description'
						value={formData.description}
						onChange={handleChange}
						required
						rows={4}
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none'
						placeholder='Describe the project...'
					/>
				</div>

				{/* Founder */}
				<div>
					<label
						htmlFor='founder'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Founder Name *
					</label>
					<input
						type='text'
						id='founder'
						name='founder'
						value={formData.founder}
						onChange={handleChange}
						required
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='e.g., Sarah Chen'
					/>
				</div>

				{/* Category */}
				<div>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Category *
					</label>
					<select
						id='category'
						name='category'
						value={formData.category}
						onChange={handleChange}
						required
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors'>
						{categories.map((cat) => (
							<option
								key={cat.value}
								value={cat.value}>
								{cat.label}
							</option>
						))}
					</select>
				</div>

				{/* Metrics */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='metricsValue'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Metrics Value
						</label>
						<input
							type='text'
							id='metricsValue'
							name='metricsValue'
							value={formData.metricsValue}
							onChange={handleChange}
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
							placeholder='e.g., 2.5k'
						/>
					</div>
					<div>
						<label
							htmlFor='metricsLabel'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Metrics Label
						</label>
						<input
							type='text'
							id='metricsLabel'
							name='metricsLabel'
							value={formData.metricsLabel}
							onChange={handleChange}
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
							placeholder='e.g., active users'
						/>
					</div>
				</div>

				{/* Link */}
				<div>
					<label
						htmlFor='link'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Project Link
					</label>
					<input
						type='url'
						id='link'
						name='link'
						value={formData.link}
						onChange={handleChange}
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='https://example.com'
					/>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={loading}
					className='w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(19,40,85,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
					{loading ? (
						<>
							<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
							<span>Adding Project...</span>
						</>
					) : (
						<>
							<Plus className='w-5 h-5' />
							<span>Add Project</span>
						</>
					)}
				</button>
			</form>
		</div>
	);
}
