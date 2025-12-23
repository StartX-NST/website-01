import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { toast } = useToast();
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// Get the page they were trying to access before login
	const from = (location.state as any)?.from?.pathname || '/';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: Replace with actual API call
		// For now, use mock login with isMember = false initially
		login({
			id: '1',
			email: email,
			name: email.split('@')[0], // Use email prefix as name
			isMember: false, // User needs to apply for membership
		});

		toast({
			title: 'Login Successful',
			description: 'Welcome to StartX!',
		});

		// Redirect to the page they were trying to access, or home
		navigate(from, { replace: true });
	};

	return (
		<div className='min-h-screen flex items-center justify-center py-12 px-6 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-md relative z-10'>
				<Card className='bg-card/50 backdrop-blur-sm border-border/50 shadow-xl'>
					<CardHeader className='text-center space-y-4'>
						<div className='mx-auto w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center'>
							<Lock
								className='w-8 h-8 text-primary'
								strokeWidth={1.5}
							/>
						</div>
						<CardTitle className='text-3xl font-display font-bold tracking-tight'>
							Member Login
						</CardTitle>
						<CardDescription className='text-base text-muted-foreground/80'>
							Enter your credentials to access your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit}
							className='space-y-5'>
							<div className='space-y-2'>
								<Label
									htmlFor='email'
									className='text-sm font-medium'>
									Email Address
								</Label>
								<Input
									id='email'
									type='email'
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									placeholder='your@email.com'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='password'
									className='text-sm font-medium'>
									Password
								</Label>
								<Input
									id='password'
									type='password'
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									placeholder='••••••••'
								/>
							</div>

							<div className='flex items-center justify-between text-sm pt-1'>
								<label className='flex items-center gap-2 cursor-pointer text-muted-foreground/80 hover:text-foreground transition-colors'>
									<input
										type='checkbox'
										className='rounded border-border accent-primary'
									/>
									<span>Remember me</span>
								</label>
								<a
									href='#'
									className='text-primary hover:text-primary/80 transition-colors font-medium'>
									Forgot password?
								</a>
							</div>

							<Button
								type='submit'
								className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'>
								Sign In
							</Button>

							<div className='text-center text-sm text-muted-foreground/80 pt-2'>
								Don't have an account?{' '}
								<a
									href='/check-eligibility'
									className='text-primary hover:text-primary/80 transition-colors font-medium'>
									Apply for membership
								</a>
							</div>
						</form>
					</CardContent>
				</Card>

				<p className='text-center text-xs text-muted-foreground/70 mt-6'>
					By logging in, you agree to our Terms of Service and Privacy
					Policy
				</p>
			</motion.div>
		</div>
	);
}
