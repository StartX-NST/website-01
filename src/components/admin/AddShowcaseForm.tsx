import { useState } from 'react';
import { Plus, CheckCircle, Link2, FileCode } from 'lucide-react';

interface ShowcaseFormData {
	title: string;
	description: string;
	founder: string;
	category: string;
	metricsLabel: string;
	metricsValue: string;
	link: string;
	htmlFile: File | null;
	linkType: 'url' | 'html';
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
		htmlFile: null,
		linkType: 'url',
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

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === 'text/html') {
			setFormData((prev) => ({ ...prev, htmlFile: file }));
		} else if (file) {
			alert('Please upload a valid HTML file');
			e.target.value = '';
		}
	};

	const handleLinkTypeChange = (type: 'url' | 'html') => {
		setFormData((prev) => ({
			...prev,
			linkType: type,
			link: '',
			htmlFile: null,
		}));
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
			htmlFile: null,
			linkType: 'url',
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

				{/* Link or HTML File */}
				<div>
					<label className='block text-sm font-medium text-gray-300 mb-3'>
						Project Link / File
					</label>

					{/* Toggle between URL and HTML */}
					<div className='flex gap-3 mb-4'>
						<button
							type='button'
							onClick={() => handleLinkTypeChange('url')}
							className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
								formData.linkType === 'url'
									? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
									: 'bg-black/60 border border-gray-700 text-gray-400 hover:border-gray-600'
							}`}>
							<Link2 className='w-4 h-4' />
							Project URL
						</button>
						<button
							type='button'
							onClick={() => handleLinkTypeChange('html')}
							className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
								formData.linkType === 'html'
									? 'bg-blue-500/20 border-2 border-blue-500 text-blue-400'
									: 'bg-black/60 border border-gray-700 text-gray-400 hover:border-gray-600'
							}`}>
							<FileCode className='w-4 h-4' />
							HTML File
						</button>
					</div>

					{/* URL Input */}
					{formData.linkType === 'url' && (
						<input
							type='url'
							id='link'
							name='link'
							value={formData.link}
							onChange={handleChange}
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
							placeholder='https://example.com'
						/>
					)}

					{/* HTML File Upload */}
					{formData.linkType === 'html' && (
						<div>
							<input
								type='file'
								id='htmlFile'
								accept='.html,.htm'
								onChange={handleFileChange}
								className='hidden'
							/>
							<label
								htmlFor='htmlFile'
								className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-gray-400 hover:border-blue-500 transition-colors cursor-pointer flex items-center justify-center gap-2 group'>
								<FileCode className='w-5 h-5 group-hover:text-blue-400 transition-colors' />
								<span className='group-hover:text-white transition-colors'>
									{formData.htmlFile
										? formData.htmlFile.name
										: 'Choose HTML file...'}
								</span>
							</label>
							<p className='mt-2 text-xs text-gray-500'>
								Upload an HTML file for your project showcase
							</p>
						</div>
					)}
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
