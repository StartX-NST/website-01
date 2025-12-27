import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MembershipApplication() {
	const navigate = useNavigate();
	const { user, updateApplicationStatus } = useAuth();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<'form' | 'success'>('form');

	const [formData, setFormData] = useState({
		linkedinUrl: '',
		currentRole: '',
		company: '',
		yearsOfExperience: '',
		startupIdea: '',
		whyJoin: '',
		commitment: '',
		referralSource: '',
	});

	// Get status config for displaying application status
	const statusConfig = {
		none: null,
		draft: {
			icon: Clock,
			title: 'Draft Saved',
			message:
				'Your application has been saved as a draft. Continue editing or submit when ready.',
			color: 'gray',
		},
		submitted: {
			icon: Clock,
			title: 'Application Submitted',
			message:
				'Your application has been received and is awaiting review.',
			color: 'blue',
		},
		under_review: {
			icon: Clock,
			title: 'Under Review',
			message:
				'Our team is currently reviewing your application. You will hear from us soon!',
			color: 'yellow',
		},
		approved: {
			icon: CheckCircle,
			title: 'Application Approved!',
			message:
				'Congratulations! You are now a StartX member. Welcome to the community!',
			color: 'emerald',
		},
		rejected: {
			icon: AlertCircle,
			title: 'Application Decision',
			message:
				'Thank you for your interest. Unfortunately, we cannot approve your application at this time.',
			color: 'red',
		},
	};

	const currentStatus = user?.applicationStatus || 'none';
	const status = statusConfig[currentStatus as keyof typeof statusConfig];

	// If application is already submitted/reviewed, show status page
	if (status && currentStatus !== 'none' && currentStatus !== 'draft') {
		const Icon = status.icon;
		return (
			<div className='min-h-screen bg-black flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<div className='text-center mb-8'>
						<Link
							to='/'
							className='inline-block text-2xl font-bold text-white hover:text-emerald-400 transition-colors mb-2'>
							StartX
						</Link>
					</div>

					<div className='bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl'>
						<div className='text-center'>
							<div
								className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${status.color}-500/10 border border-${status.color}-500/20 mb-6`}>
								<Icon
									className={`w-8 h-8 text-${status.color}-400`}
								/>
							</div>
							<h2 className='text-2xl font-bold text-white mb-4'>
								{status.title}
							</h2>
							<p className='text-gray-400 mb-8 leading-relaxed'>
								{status.message}
							</p>
							<Link
								to='/'
								className='inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all'>
								Back to Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const handleSaveDraft = () => {
		updateApplicationStatus('draft');
		navigate('/');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		updateApplicationStatus('submitted');
		setLoading(false);
		setStep('success');
	};

	if (step === 'success') {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<div className='text-center mb-8'>
						<Link
							to='/'
							className='inline-block text-2xl font-bold text-white hover:text-emerald-400 transition-colors mb-2'>
							StartX
						</Link>
					</div>

					<div className='bg-black/80 border border-gray-800 rounded-xl p-12 backdrop-blur-xl'>
						<div className='text-center'>
							<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6'>
								<CheckCircle className='w-8 h-8 text-emerald-400' />
							</div>
							<h2 className='text-2xl font-bold text-white mb-4'>
								Application Submitted!
							</h2>
							<p className='text-gray-400 mb-8 leading-relaxed'>
								Thank you for applying to join StartX. Our team
								will review your application and get back to you
								within 3-5 business days.
							</p>
							<Link
								to='/'
								className='inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'>
								Done
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black py-12 px-4'>
			<div className='max-w-2xl mx-auto'>
				<div className='text-center mb-8'>
					<Link
						to='/'
						className='inline-block text-2xl font-bold text-white hover:text-emerald-400 transition-colors mb-4'>
						StartX
					</Link>
					<h1 className='text-3xl font-bold text-white mb-2'>
						Membership Application
					</h1>
					<p className='text-gray-400'>
						Join our community of founders and innovators
					</p>
				</div>

				<div className='bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl'>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'>
						{/* LinkedIn URL */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								LinkedIn Profile URL *
							</label>
							<input
								type='url'
								required
								value={formData.linkedinUrl}
								onChange={(e) =>
									setFormData({
										...formData,
										linkedinUrl: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all'
								placeholder='https://linkedin.com/in/yourprofile'
							/>
						</div>

						{/* Current Role */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-2'>
									Current Role *
								</label>
								<input
									type='text'
									required
									value={formData.currentRole}
									onChange={(e) =>
										setFormData({
											...formData,
											currentRole: e.target.value,
										})
									}
									className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all'
									placeholder='Founder, Developer, etc.'
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-2'>
									Company/Project
								</label>
								<input
									type='text'
									value={formData.company}
									onChange={(e) =>
										setFormData({
											...formData,
											company: e.target.value,
										})
									}
									className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all'
									placeholder='Your company name'
								/>
							</div>
						</div>

						{/* Years of Experience */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Years of Experience *
							</label>
							<select
								required
								value={formData.yearsOfExperience}
								onChange={(e) =>
									setFormData({
										...formData,
										yearsOfExperience: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 transition-all'>
								<option value=''>
									Select experience level
								</option>
								<option value='0-2'>0-2 years</option>
								<option value='3-5'>3-5 years</option>
								<option value='6-10'>6-10 years</option>
								<option value='10+'>10+ years</option>
							</select>
						</div>

						{/* Startup Idea */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								What are you building? *
							</label>
							<textarea
								required
								value={formData.startupIdea}
								onChange={(e) =>
									setFormData({
										...formData,
										startupIdea: e.target.value,
									})
								}
								rows={3}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none'
								placeholder='Brief description of your project or startup idea...'
							/>
						</div>

						{/* Why Join */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Why do you want to join StartX? *
							</label>
							<textarea
								required
								value={formData.whyJoin}
								onChange={(e) =>
									setFormData({
										...formData,
										whyJoin: e.target.value,
									})
								}
								rows={3}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all resize-none'
								placeholder='What are you hoping to gain from the community?'
							/>
						</div>

						{/* Commitment */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Time Commitment *
							</label>
							<select
								required
								value={formData.commitment}
								onChange={(e) =>
									setFormData({
										...formData,
										commitment: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500/50 transition-all'>
								<option value=''>
									Select your availability
								</option>
								<option value='part-time'>
									Part-time (5-10 hours/week)
								</option>
								<option value='full-time'>
									Full-time (20+ hours/week)
								</option>
								<option value='weekends'>Weekends only</option>
								<option value='flexible'>
									Flexible/Variable
								</option>
							</select>
						</div>

						{/* Referral Source */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								How did you hear about us?
							</label>
							<input
								type='text'
								value={formData.referralSource}
								onChange={(e) =>
									setFormData({
										...formData,
										referralSource: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-all'
								placeholder='Friend, social media, search, etc.'
							/>
						</div>

						{/* Action buttons */}
						<div className='flex gap-3 pt-4'>
							<button
								type='button'
								onClick={handleSaveDraft}
								className='flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all'>
								Save Draft
							</button>
							<button
								type='submit'
								disabled={loading}
								className='flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
								{loading ? (
									<>
										<Loader2 className='w-5 h-5 animate-spin' />
										<span>Submitting...</span>
									</>
								) : (
									<span>Submit Application</span>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
