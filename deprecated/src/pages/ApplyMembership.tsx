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
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
	CheckCircle,
	Rocket,
	User,
	GraduationCap,
	Lightbulb,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ApplyMembership() {
	const navigate = useNavigate();
	const { toast } = useToast();
	const { updateMembershipStatus } = useAuth();
	const [submitted, setSubmitted] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		campus: '',
		year: '',
		interests: '',
		experience: '',
		motivation: '',
	});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: Submit to backend
		// For now, simulate successful application
		setTimeout(() => {
			setSubmitted(true);
			// Update membership status after successful application
			updateMembershipStatus(true);
			toast({
				title: 'Application Submitted!',
				description: 'Welcome to StartX! You now have full access.',
			});
		}, 1000);
	};

	if (submitted) {
		return (
			<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6 bg-subtle-pattern relative'>
				<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className='max-w-2xl w-full relative z-10'>
					<Card className='bg-card/50 backdrop-blur-sm border-border/50 text-center shadow-xl'>
						<CardHeader className='space-y-4'>
							<div className='mx-auto w-20 h-20 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center'>
								<CheckCircle
									className='w-10 h-10 text-green-500'
									strokeWidth={1.5}
								/>
							</div>
							<CardTitle className='text-3xl font-display font-bold tracking-tight'>
								Welcome to StartX!
							</CardTitle>
							<CardDescription className='text-lg text-muted-foreground/80 mt-4'>
								Your membership has been approved! You now have
								full access to all courses, events, and
								resources.
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-2 space-y-4'>
							<Button
								onClick={() => navigate('/learn')}
								className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'>
								Start Learning
							</Button>
							<Button
								onClick={() => navigate('/')}
								variant='outline'
								className='w-full border-border/50 hover:bg-muted/50 py-6'>
								Back to Home
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-[calc(100vh-4rem)] py-24 px-6 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
			<div className='max-w-4xl mx-auto relative z-10'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'>
					<div className='inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
						<div className='flex items-center gap-2'>
							<Rocket
								className='w-4 h-4 text-primary'
								strokeWidth={2}
							/>
							<div className='h-3 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent' />
						</div>
						<span className='text-sm font-medium text-primary'>
							Become a Member
						</span>
					</div>
					<h1 className='text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight'>
						Join the <span className='text-primary'>StartX</span>{' '}
						Community
					</h1>
					<p className='text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed'>
						Fill out the application below to unlock full access to
						courses, events, and exclusive resources
					</p>
				</motion.div>

				{/* Application Form */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}>
					<Card className='bg-card/50 backdrop-blur-sm border-border/50 shadow-xl'>
						<CardHeader>
							<CardTitle className='text-2xl font-display'>
								Membership Application
							</CardTitle>
							<CardDescription className='text-base text-muted-foreground/80'>
								Tell us about yourself and your entrepreneurial
								interests
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handleSubmit}
								className='space-y-6'>
								{/* Personal Information */}
								<div className='space-y-4'>
									<h3 className='text-lg font-semibold flex items-center gap-3'>
										<User
											className='w-5 h-5 text-primary'
											strokeWidth={2}
										/>
										Personal Information
									</h3>

									<div className='grid md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label
												htmlFor='name'
												className='text-sm font-medium'>
												Full Name *
											</Label>
											<Input
												id='name'
												name='name'
												required
												value={formData.name}
												onChange={handleChange}
												className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
												placeholder='John Doe'
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='email'
												className='text-sm font-medium'>
												Email Address *
											</Label>
											<Input
												id='email'
												name='email'
												type='email'
												required
												value={formData.email}
												onChange={handleChange}
												className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
												placeholder='john@example.com'
											/>
										</div>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='phone'
											className='text-sm font-medium'>
											Phone Number
										</Label>
										<Input
											id='phone'
											name='phone'
											type='tel'
											value={formData.phone}
											onChange={handleChange}
											className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
											placeholder='+1 (555) 000-0000'
										/>
									</div>
								</div>

								{/* Campus Information */}
								<div className='space-y-4 pt-6 border-t border-border/50'>
									<h3 className='text-lg font-semibold flex items-center gap-3'>
										<GraduationCap
											className='w-5 h-5 text-primary'
											strokeWidth={2}
										/>
										Campus Information
									</h3>

									<div className='grid md:grid-cols-2 gap-4'>
										<div className='space-y-2'>
											<Label
												htmlFor='campus'
												className='text-sm font-medium'>
												Campus *
											</Label>
											<Input
												id='campus'
												name='campus'
												required
												value={formData.campus}
												onChange={handleChange}
												className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
												placeholder='Stanford University'
											/>
										</div>

										<div className='space-y-2'>
											<Label
												htmlFor='year'
												className='text-sm font-medium'>
												Year of Study *
											</Label>
											<select
												id='year'
												name='year'
												required
												value={formData.year}
												onChange={handleChange}
												className='w-full h-11 px-3 rounded-md bg-background/50 border border-border/50 focus:border-primary/50 transition-colors text-sm'>
												<option value=''>
													Select Year
												</option>
												<option value='freshman'>
													Freshman
												</option>
												<option value='sophomore'>
													Sophomore
												</option>
												<option value='junior'>
													Junior
												</option>
												<option value='senior'>
													Senior
												</option>
												<option value='graduate'>
													Graduate
												</option>
											</select>
										</div>
									</div>
								</div>

								{/* Interests and Experience */}
								<div className='space-y-4 pt-6 border-t border-border/50'>
									<h3 className='text-lg font-semibold flex items-center gap-3'>
										<Lightbulb
											className='w-5 h-5 text-primary'
											strokeWidth={2}
										/>
										Interests & Experience
									</h3>

									<div className='space-y-2'>
										<Label
											htmlFor='interests'
											className='text-sm font-medium'>
											Areas of Interest *
										</Label>
										<Input
											id='interests'
											name='interests'
											required
											value={formData.interests}
											onChange={handleChange}
											className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
											placeholder='e.g., AI, Web Development, Blockchain'
										/>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='experience'
											className='text-sm font-medium'>
											Previous Experience
										</Label>
										<Textarea
											id='experience'
											name='experience'
											value={formData.experience}
											onChange={handleChange}
											rows={4}
											className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none'
											placeholder='Tell us about your relevant experience, projects, or achievements...'
										/>
									</div>

									<div className='space-y-2'>
										<Label
											htmlFor='motivation'
											className='text-sm font-medium'>
											Why StartX? *
										</Label>
										<Textarea
											id='motivation'
											name='motivation'
											required
											value={formData.motivation}
											onChange={handleChange}
											rows={4}
											className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none'
											placeholder='What motivates you to join StartX? What do you hope to achieve?'
										/>
									</div>
								</div>

								<Button
									type='submit'
									className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'>
									Submit Application
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>

				{/* Eligibility Criteria */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className='mt-8'>
					<Card className='bg-card/50 backdrop-blur-sm border-border/50'>
						<CardHeader>
							<CardTitle className='text-xl font-display flex items-center gap-3'>
								<div className='flex items-center gap-2'>
									<CheckCircle
										className='w-5 h-5 text-primary'
										strokeWidth={2}
									/>
									<div className='h-4 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent' />
								</div>
								Membership Criteria
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-3'>
							{[
								'Currently enrolled in a college or university',
								'Strong passion for entrepreneurship and innovation',
								'Commitment to actively participate in community events',
								'Interest in one or more startup-related domains',
							].map((requirement, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.5 + index * 0.1 }}
									className='flex items-start gap-3 text-muted-foreground/80'>
									<CheckCircle
										className='w-5 h-5 text-primary mt-0.5 shrink-0'
										strokeWidth={2}
									/>
									<span>{requirement}</span>
								</motion.div>
							))}
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
