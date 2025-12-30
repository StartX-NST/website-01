import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { login } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const from = (location.state as any)?.from?.pathname || '/';

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await login(formData.email, formData.password);
			navigate(from, { replace: true });
		} catch (err) {
			setError('Authentication failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

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
						Welcome back
					</h1>
					<p className='text-gray-400'>
						Sign in to access your account
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
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
								placeholder='Enter your email'
							/>
						</div>
						<div>
							<div className='flex items-center justify-between mb-2'>
								<label className='block text-sm font-medium text-gray-300'>
									Password
								</label>
								<Link
									to='/forgot-password'
									className='text-xs text-blue-400 hover:text-blue-300 transition-colors'>
									Forgot password?
								</Link>
							</div>
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
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
								placeholder='Enter your password'
							/>
						</div>{' '}
						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
							{loading ? (
								<>
									<Loader2 className='w-5 h-5 animate-spin' />
									<span>Signing in...</span>
								</>
							) : (
								<span>Sign in</span>
							)}
						</button>
						<p className='text-center text-sm text-gray-400'>
							Don't have an account?{' '}
							<Link
								to='/signup'
								className='text-blue-400 hover:text-blue-300 transition-colors'>
								Create account
							</Link>
						</p>
						<div className='pt-4 border-t border-gray-800'>
							<p className='text-xs text-gray-500 text-center mb-2'>
								Demo credentials:
							</p>
							<p className='text-xs text-gray-400 text-center'>
								<span className='text-blue-400'>
									member@test.com
								</span>{' '}
								or{' '}
								<span className='text-blue-400'>
									admin@test.com
								</span>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
