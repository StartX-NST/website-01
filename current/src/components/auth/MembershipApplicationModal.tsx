import { useState } from 'react';
import { X, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface MembershipApplicationModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function MembershipApplicationModal({
	isOpen,
	onClose,
}: MembershipApplicationModalProps) {
	const { user, updateApplicationStatus } = useAuth();
	const [loading, setLoading] = useState(false);
	const [step, setStep] = useState<'form' | 'success'>('form');

	// Form state
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Save as draft first
		updateApplicationStatus('submitted');

		// Then mark as under review
		setTimeout(() => {
			updateApplicationStatus('under_review');
		}, 500);

		setLoading(false);
		setStep('success');
	};

	const handleSaveDraft = () => {
		updateApplicationStatus('draft');
		onClose();
	};

	const handleClose = () => {
		setStep('form');
		setFormData({
			linkedinUrl: '',
			currentRole: '',
			company: '',
			yearsOfExperience: '',
			startupIdea: '',
			whyJoin: '',
			commitment: '',
			referralSource: '',
		});
		onClose();
	};

	if (!isOpen) return null;

	// Show status view if application already exists
	if (
		user?.applicationStatus &&
		user.applicationStatus !== 'none' &&
		user.applicationStatus !== 'draft' &&
		step === 'form'
	) {
		const statusConfig = {
			submitted: {
				icon: Clock,
				color: 'blue',
				title: 'Application Submitted',
				message:
					'Your membership application has been submitted and is awaiting initial review.',
			},
			under_review: {
				icon: Clock,
				color: 'yellow',
				title: 'Under Review',
				message:
					'Our team is currently reviewing your application. This typically takes 3-5 business days.',
			},
			approved: {
				icon: CheckCircle,
				color: 'emerald',
				title: 'Application Approved!',
				message:
					'Congratulations! Your membership application has been approved. You now have full access to all member benefits.',
			},
			rejected: {
				icon: AlertCircle,
				color: 'red',
				title: 'Application Not Approved',
				message:
					'Unfortunately, your application was not approved at this time. You can reapply after 90 days.',
			},
		};

		const status =
			statusConfig[user.applicationStatus as keyof typeof statusConfig];
		const Icon = status.icon;

		return (
			<div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
				<div
					className='absolute inset-0 bg-black/90 backdrop-blur-md'
					onClick={handleClose}
				/>
				<div className='relative w-full max-w-md bg-black/80 border border-gray-800 rounded-xl backdrop-blur-xl overflow-hidden'>
					<button
						onClick={handleClose}
						className='absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 z-10'>
						<X className='w-5 h-5' />
					</button>

					<div className='p-8 text-center'>
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
						<button
							onClick={handleClose}
							className='px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all'>
							Close
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto'>
			<div
				className='absolute inset-0 bg-black/90 backdrop-blur-md'
				onClick={step === 'form' ? undefined : handleClose}
			/>

			<div className='relative w-full max-w-2xl bg-black/80 border border-gray-800 rounded-xl backdrop-blur-xl overflow-hidden my-8'>
				<button
					onClick={handleClose}
					className='absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 z-10'>
					<X className='w-5 h-5' />
				</button>

				{step === 'form' ? (
					<div className='relative p-8'>
						<div className='mb-8'>
							<h2 className='text-2xl font-bold text-white mb-2'>
								Membership Application
							</h2>
							<p className='text-sm text-gray-400'>
								Join our community of founders and innovators
							</p>
						</div>

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
									<option value='weekends'>
										Weekends only
									</option>
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
				) : (
					<div className='relative p-12 text-center'>
						<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6'>
							<CheckCircle className='w-8 h-8 text-emerald-400' />
						</div>
						<h2 className='text-2xl font-bold text-white mb-4'>
							Application Submitted!
						</h2>
						<p className='text-gray-400 mb-8 leading-relaxed'>
							Thank you for applying to join StartX. Our team will
							review your application and get back to you within
							3-5 business days.
						</p>
						<button
							onClick={handleClose}
							className='px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'>
							Done
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
