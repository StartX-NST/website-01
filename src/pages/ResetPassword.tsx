import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		// Validate password strength
		if (formData.password.length < 8) {
			setError('Password must be at least 8 characters long');
			return;
		}

		// Check if token exists
		if (!token) {
			setError('Invalid reset link. Please request a new one.');
			return;
		}

		setLoading(true);

		try {
			// Simulate API call to reset password
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// In a real app, this would call your API
			// await resetPassword(token, formData.password);

			setSuccess(true);

			// Redirect to login after 3 seconds
			setTimeout(() => {
				navigate('/login');
			}, 3000);
		} catch (err) {
			setError(
				'Failed to reset password. The link may have expired. Please request a new one.'
			);
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<div className='min-h-screen bg-black flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<div className='bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl text-center'>
						<div className='w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6'>
							<CheckCircle className='w-8 h-8 text-blue-400' />
						</div>

						<h1 className='text-2xl font-bold text-white mb-3'>
							Password reset successful!
						</h1>

						<p className='text-gray-400 mb-6'>
							Your password has been successfully reset. You can
							now log in with your new password.
						</p>

						<div className='bg-blue-500/5 border border-blue-500/20 rounded-lg p-4'>
							<p className='text-sm text-gray-300'>
								Redirecting to login page...
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-black flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<div className='text-center mb-8'>
					<Link
						to='/'
						className='inline-block hover:opacity-80 transition-opacity'>
						<img
							src='/image.png'
							alt='StartX Logo'
							className='h-8 w-auto'
						/>
					</Link>
					<h1 className='text-3xl font-bold text-white mb-2'>
						Set new password
					</h1>
					<p className='text-gray-400'>
						Enter your new password below
					</p>
				</div>{' '}
				<div className='bg-black/80 border border-gray-800 rounded-xl p-8 backdrop-blur-xl'>
					<form
						onSubmit={handleSubmit}
						className='space-y-5'>
						{error && (
							<div className='p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm'>
								{error}
							</div>
						)}

						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								New Password
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									required
									minLength={8}
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									className='w-full px-4 pr-11 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
									placeholder='Enter new password'
								/>
								<button
									type='button'
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors'>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
							<p className='text-xs text-gray-500 mt-1'>
								Must be at least 8 characters
							</p>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Confirm New Password
							</label>
							<div className='relative'>
								<input
									type={
										showConfirmPassword
											? 'text'
											: 'password'
									}
									required
									minLength={8}
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({
											...formData,
											confirmPassword: e.target.value,
										})
									}
									className='w-full px-4 pr-11 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
									placeholder='Confirm new password'
								/>
								<button
									type='button'
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors'>
									{showConfirmPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
							{loading ? (
								<>
									<Loader2 className='w-5 h-5 animate-spin' />
									<span>Resetting password...</span>
								</>
							) : (
								<span>Reset password</span>
							)}
						</button>

						<div className='pt-4 border-t border-gray-800'>
							<p className='text-center text-sm text-gray-400'>
								Remember your password?{' '}
								<Link
									to='/login'
									className='text-blue-400 hover:text-blue-300 transition-colors'>
									Sign in
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
