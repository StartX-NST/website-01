import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	defaultMode?: 'signin' | 'signup';
}

export default function AuthModal({
	isOpen,
	onClose,
	defaultMode = 'signin',
}: AuthModalProps) {
	const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const { login, signup } = useAuth();

	// Form state
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			if (mode === 'signin') {
				await login(formData.email, formData.password);
			} else {
				await signup(formData.name, formData.email, formData.password);
			}
			onClose();
			setFormData({ name: '', email: '', password: '' });
		} catch (err) {
			setError('Authentication failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-black/90 backdrop-blur-md'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='relative w-full max-w-md bg-black/80 border border-gray-800 rounded-xl backdrop-blur-xl overflow-hidden'>
				{/* Glow effect */}
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[120px]' />

				{/* Close button */}
				<button
					onClick={onClose}
					className='absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 z-10'>
					<X className='w-5 h-5' />
				</button>

				<div className='relative p-8'>
					{/* Header */}
					<div className='mb-8'>
						<h2 className='text-2xl font-bold text-white mb-2'>
							{mode === 'signin' ? 'Sign in' : 'Create account'}
						</h2>
						<p className='text-sm text-gray-400'>
							{mode === 'signin'
								? 'Welcome back to StartX'
								: 'Join the StartX community'}
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className='space-y-5'>
						{mode === 'signup' && (
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-2'>
									Name
								</label>
								<input
									type='text'
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									className='w-full px-4 py-2.5 bg-black/40 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors'
									placeholder='Enter your name'
								/>
							</div>
						)}

						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Email
							</label>
							<input
								type='email'
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({
										...formData,
										email: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors'
								placeholder='Enter your email'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Password
							</label>
							<input
								type='password'
								required
								value={formData.password}
								onChange={(e) =>
									setFormData({
										...formData,
										password: e.target.value,
									})
								}
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 transition-colors'
								placeholder='Enter your password'
							/>
						</div>

						{error && (
							<div className='px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg'>
								<p className='text-sm text-red-400'>{error}</p>
							</div>
						)}

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6'>
							{loading ? (
								<>
									<Loader2 className='w-5 h-5 animate-spin' />
									<span>Please wait...</span>
								</>
							) : (
								<span>
									{mode === 'signin'
										? 'Sign in'
										: 'Create account'}
								</span>
							)}
						</button>
					</form>

					{/* Toggle mode */}
					<div className='mt-6 text-center'>
						<button
							onClick={() => {
								setMode(
									mode === 'signin' ? 'signup' : 'signin'
								);
								setError('');
							}}
							className='text-sm text-gray-400 hover:text-white transition-colors'>
							{mode === 'signin' ? (
								<>
									Don't have an account?{' '}
									<span className='text-emerald-400 hover:text-emerald-300'>
										Sign up
									</span>
								</>
							) : (
								<>
									Already have an account?{' '}
									<span className='text-emerald-400 hover:text-emerald-300'>
										Sign in
									</span>
								</>
							)}
						</button>
					</div>

					{/* Demo hint */}
					<div className='mt-6 pt-6 border-t border-gray-800'>
						<p className='text-xs text-center text-gray-500'>
							Demo: Try{' '}
							<span className='text-emerald-400 font-medium'>
								member@test.com
							</span>{' '}
							or{' '}
							<span className='text-emerald-400 font-medium'>
								admin@test.com
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
