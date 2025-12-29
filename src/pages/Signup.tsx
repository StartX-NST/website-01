import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
	const navigate = useNavigate();
	const { signup } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

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
			await signup(formData.name, formData.email, formData.password);
			navigate('/', { replace: true });
		} catch (err) {
			setError('Sign up failed. Please try again.');
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
						className='inline-block text-2xl font-bold text-white hover:text-blue-400 transition-colors mb-2'>
						StartX
					</Link>
					<h1 className='text-3xl font-bold text-white mb-2'>
						Create account
					</h1>
					<p className='text-gray-400'>Join the StartX community</p>
				</div>

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
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
								placeholder='Enter your name'
							/>
						</div>

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
								className='w-full px-4 py-2.5 bg-black/40 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all'
								placeholder='Enter your password'
							/>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-blue-500 hover:bg-blue-400 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(19,40,85,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'>
							{loading ? (
								<>
									<Loader2 className='w-5 h-5 animate-spin' />
									<span>Creating account...</span>
								</>
							) : (
								<span>Create account</span>
							)}
						</button>

						<p className='text-center text-sm text-gray-400'>
							Already have an account?{' '}
							<Link
								to='/login'
								className='text-blue-400 hover:text-blue-300 transition-colors'>
								Sign in
							</Link>
						</p>

						<div className='pt-4 border-t border-gray-800'>
							<p className='text-xs text-gray-500 text-center mb-2'>
								Demo: Use{' '}
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
