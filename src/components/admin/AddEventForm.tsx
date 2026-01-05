import { useState } from 'react';
import { Plus, CheckCircle, Calendar } from 'lucide-react';

interface EventFormData {
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	type: 'workshop' | 'talk' | 'panel' | 'competition' | 'networking';
	maxAttendees: number;
	status: 'upcoming' | 'ongoing' | 'completed';
}

export default function AddEventForm() {
	const [formData, setFormData] = useState<EventFormData>({
		title: '',
		description: '',
		date: '',
		time: '',
		location: '',
		type: 'workshop',
		maxAttendees: 50,
		status: 'upcoming',
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const eventTypes = [
		{ value: 'workshop', label: 'Workshop' },
		{ value: 'talk', label: 'Talk' },
		{ value: 'panel', label: 'Panel' },
		{ value: 'competition', label: 'Competition' },
		{ value: 'networking', label: 'Networking' },
	];

	const statusOptions = [
		{ value: 'upcoming', label: 'Upcoming' },
		{ value: 'ongoing', label: 'Ongoing' },
		{ value: 'completed', label: 'Completed' },
	];

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'maxAttendees' ? parseInt(value) || 0 : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess(false);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// In a real app, this would send data to backend
		console.log('New event:', formData);

		setLoading(false);
		setSuccess(true);

		// Reset form
		setFormData({
			title: '',
			description: '',
			date: '',
			time: '',
			location: '',
			type: 'workshop',
			maxAttendees: 50,
			status: 'upcoming',
		});

		// Hide success message after 3 seconds
		setTimeout(() => setSuccess(false), 3000);
	};

	return (
		<div>
			<h2 className='text-2xl font-bold text-white mb-6'>
				Add New Event
			</h2>

			{success && (
				<div className='mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center gap-3'>
					<CheckCircle className='w-5 h-5 text-blue-400' />
					<span className='text-blue-400 font-medium'>
						Event added successfully!
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
						Event Title *
					</label>
					<input
						type='text'
						id='title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						required
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='e.g., Building Your MVP in 48 Hours'
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
						placeholder='Describe the event...'
					/>
				</div>

				{/* Date and Time */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='date'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Date *
						</label>
						<div className='relative'>
							<input
								type='text'
								id='date'
								name='date'
								value={formData.date}
								onChange={handleChange}
								required
								className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
								placeholder='e.g., Jan 15, 2026'
							/>
							<Calendar className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none' />
						</div>
					</div>
					<div>
						<label
							htmlFor='time'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Time *
						</label>
						<input
							type='text'
							id='time'
							name='time'
							value={formData.time}
							onChange={handleChange}
							required
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
							placeholder='e.g., 10:00 AM - 6:00 PM'
						/>
					</div>
				</div>

				{/* Location */}
				<div>
					<label
						htmlFor='location'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Location *
					</label>
					<input
						type='text'
						id='location'
						name='location'
						value={formData.location}
						onChange={handleChange}
						required
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='e.g., Online (Zoom) or Building 360, Room 105'
					/>
				</div>

				{/* Event Type and Status */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='type'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Event Type *
						</label>
						<select
							id='type'
							name='type'
							value={formData.type}
							onChange={handleChange}
							required
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors'>
							{eventTypes.map((type) => (
								<option
									key={type.value}
									value={type.value}>
									{type.label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor='status'
							className='block text-sm font-medium text-gray-300 mb-2'>
							Status *
						</label>
						<select
							id='status'
							name='status'
							value={formData.status}
							onChange={handleChange}
							required
							className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors'>
							{statusOptions.map((status) => (
								<option
									key={status.value}
									value={status.value}>
									{status.label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Max Attendees */}
				<div>
					<label
						htmlFor='maxAttendees'
						className='block text-sm font-medium text-gray-300 mb-2'>
						Maximum Attendees *
					</label>
					<input
						type='number'
						id='maxAttendees'
						name='maxAttendees'
						value={formData.maxAttendees}
						onChange={handleChange}
						required
						min='1'
						className='w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors'
						placeholder='e.g., 50'
					/>
					<p className='mt-2 text-xs text-gray-500'>
						Set the maximum number of people who can attend this
						event
					</p>
				</div>

				{/* Submit Button */}
				<button
					type='submit'
					disabled={loading}
					className='w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(19,40,85,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
					{loading ? (
						<>
							<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
							<span>Adding Event...</span>
						</>
					) : (
						<>
							<Plus className='w-5 h-5' />
							<span>Add Event</span>
						</>
					)}
				</button>
			</form>
		</div>
	);
}
