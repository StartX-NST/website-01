import { useState } from 'react';
import { Check, X, Clock, Mail, Phone, Calendar } from 'lucide-react';

interface Application {
	id: string;
	name: string;
	email: string;
	phone: string;
	campus: string;
	year: string;
	interests: string;
	experience: string;
	motivation: string;
	status: 'submitted' | 'under_review' | 'approved' | 'rejected';
	submittedAt: string;
}

// Mock applications data
const mockApplications: Application[] = [
	{
		id: '1',
		name: 'Alice Johnson',
		email: 'alice@example.com',
		phone: '+1 234-567-8901',
		campus: 'Stanford University',
		year: 'Sophomore',
		interests: 'AI, Machine Learning, Product Development',
		experience:
			'Built 2 ML projects, interned at tech startup, founded AI club',
		motivation:
			'Want to learn from experienced founders and build impactful products',
		status: 'submitted',
		submittedAt: '2024-12-28',
	},
	{
		id: '2',
		name: 'Bob Smith',
		email: 'bob@example.com',
		phone: '+1 234-567-8902',
		campus: 'MIT',
		year: 'Junior',
		interests: 'Fintech, Blockchain, Web3',
		experience: 'Co-founded campus payment app with 500+ users',
		motivation:
			'Looking to scale my startup and connect with like-minded entrepreneurs',
		status: 'under_review',
		submittedAt: '2024-12-27',
	},
	{
		id: '3',
		name: 'Carol Davis',
		email: 'carol@example.com',
		phone: '+1 234-567-8903',
		campus: 'Harvard University',
		year: 'Senior',
		interests: 'Healthcare, BioTech, Social Impact',
		experience:
			'Research on healthcare AI, built telemedicine platform prototype',
		motivation:
			'Want to make healthcare more accessible through technology',
		status: 'submitted',
		submittedAt: '2024-12-26',
	},
];

export default function ApplicationsManager() {
	const [applications, setApplications] =
		useState<Application[]>(mockApplications);
	const [selectedApp, setSelectedApp] = useState<Application | null>(null);
	const [filter, setFilter] = useState<
		'all' | 'submitted' | 'under_review' | 'approved' | 'rejected'
	>('all');

	const handleStatusChange = (
		appId: string,
		newStatus: Application['status']
	) => {
		setApplications((prev) =>
			prev.map((app) =>
				app.id === appId ? { ...app, status: newStatus } : app
			)
		);

		// In a real app, this would call an API
		console.log(`Updated application ${appId} to status: ${newStatus}`);
	};

	const filteredApplications = applications.filter(
		(app) => filter === 'all' || app.status === filter
	);

	const getStatusBadge = (status: Application['status']) => {
		const statusConfig = {
			submitted: { text: 'New', color: 'blue' },
			under_review: { text: 'Reviewing', color: 'yellow' },
			approved: { text: 'Approved', color: 'green' },
			rejected: { text: 'Rejected', color: 'red' },
		};

		const config = statusConfig[status];
		return (
			<span
				className={`px-2.5 py-1 text-xs font-semibold rounded-full bg-${config.color}-500/10 border border-${config.color}-500/20 text-${config.color}-400`}>
				{config.text}
			</span>
		);
	};

	return (
		<div>
			<div className='flex items-center justify-between mb-6'>
				<h2 className='text-2xl font-bold text-white'>
					Membership Applications
				</h2>

				{/* Filter */}
				<select
					value={filter}
					onChange={(e) => setFilter(e.target.value as typeof filter)}
					className='px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors'>
					<option value='all'>All Applications</option>
					<option value='submitted'>New</option>
					<option value='under_review'>Under Review</option>
					<option value='approved'>Approved</option>
					<option value='rejected'>Rejected</option>
				</select>
			</div>

			{filteredApplications.length === 0 ? (
				<div className='text-center py-12'>
					<Clock className='w-12 h-12 text-gray-600 mx-auto mb-4' />
					<p className='text-gray-400'>No applications found</p>
				</div>
			) : (
				<div className='space-y-4'>
					{filteredApplications.map((app) => (
						<div
							key={app.id}
							className='border border-gray-700 rounded-lg p-6 bg-black/40 hover:border-gray-600 transition-colors'>
							<div className='flex items-start justify-between mb-4'>
								<div className='flex-1'>
									<div className='flex items-center gap-3 mb-2'>
										<h3 className='text-lg font-semibold text-white'>
											{app.name}
										</h3>
										{getStatusBadge(app.status)}
									</div>
									<div className='flex flex-wrap gap-4 text-sm text-gray-400'>
										<div className='flex items-center gap-1.5'>
											<Mail className='w-4 h-4' />
											<span>{app.email}</span>
										</div>
										<div className='flex items-center gap-1.5'>
											<Phone className='w-4 h-4' />
											<span>{app.phone}</span>
										</div>
										<div className='flex items-center gap-1.5'>
											<Calendar className='w-4 h-4' />
											<span>
												Submitted: {app.submittedAt}
											</span>
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className='flex gap-2'>
									<button
										onClick={() =>
											setSelectedApp(
												selectedApp?.id === app.id
													? null
													: app
											)
										}
										className='px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors'>
										{selectedApp?.id === app.id
											? 'Hide Details'
											: 'View Details'}
									</button>
								</div>
							</div>

							{/* Expanded Details */}
							{selectedApp?.id === app.id && (
								<div className='mt-4 pt-4 border-t border-gray-700 space-y-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<label className='text-xs font-semibold text-gray-400 uppercase'>
												Campus
											</label>
											<p className='text-white mt-1'>
												{app.campus}
											</p>
										</div>
										<div>
											<label className='text-xs font-semibold text-gray-400 uppercase'>
												Year
											</label>
											<p className='text-white mt-1'>
												{app.year}
											</p>
										</div>
									</div>

									<div>
										<label className='text-xs font-semibold text-gray-400 uppercase'>
											Interests
										</label>
										<p className='text-white mt-1'>
											{app.interests}
										</p>
									</div>

									<div>
										<label className='text-xs font-semibold text-gray-400 uppercase'>
											Experience
										</label>
										<p className='text-white mt-1'>
											{app.experience}
										</p>
									</div>

									<div>
										<label className='text-xs font-semibold text-gray-400 uppercase'>
											Motivation
										</label>
										<p className='text-white mt-1'>
											{app.motivation}
										</p>
									</div>

									{/* Decision Buttons */}
									<div className='flex gap-3 pt-4'>
										<button
											onClick={() =>
												handleStatusChange(
													app.id,
													'approved'
												)
											}
											disabled={app.status === 'approved'}
											className='flex items-center gap-2 px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
											<Check className='w-4 h-4' />
											<span>Approve</span>
										</button>
										<button
											onClick={() =>
												handleStatusChange(
													app.id,
													'rejected'
												)
											}
											disabled={app.status === 'rejected'}
											className='flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
											<X className='w-4 h-4' />
											<span>Reject</span>
										</button>
										{app.status === 'submitted' && (
											<button
												onClick={() =>
													handleStatusChange(
														app.id,
														'under_review'
													)
												}
												className='flex items-center gap-2 px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-400 font-medium rounded-lg transition-all'>
												<Clock className='w-4 h-4' />
												<span>Mark as Reviewing</span>
											</button>
										)}
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
