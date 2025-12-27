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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Rocket } from 'lucide-react';

export default function CheckEligibility() {
	const [submitted, setSubmitted] = useState(false);
	const { toast } = useToast();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		toast({
			title: 'Application Submitted!',
			description:
				"We'll review your application and get back to you within 3-5 business days.",
		});
	};

	if (submitted) {
		return (
			<div className='min-h-screen flex items-center justify-center py-12 px-6 bg-subtle-pattern relative'>
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
								Application Received!
							</CardTitle>
							<CardDescription className='text-lg text-muted-foreground/80 mt-4'>
								Thank you for your interest in StartX. We'll
								review your application and contact you soon.
							</CardDescription>
						</CardHeader>
						<CardContent className='pt-2'>
							<Button
								asChild
								className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'>
								<a href='/'>Back to Home</a>
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='min-h-screen py-24 px-6 lg:px-12 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='max-w-3xl mx-auto relative z-10'>
				<div className='mb-16 text-center'>
					<div className='inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
						<div className='flex items-center gap-2'>
							<Rocket
								className='w-4 h-4 text-primary'
								strokeWidth={2}
							/>
							<div className='h-3 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent' />
						</div>
						<span className='text-sm font-medium text-primary'>
							Join StartX
						</span>
					</div>
					<h1 className='text-5xl font-display font-bold mb-6 tracking-tight'>
						Check Your{' '}
						<span className='glow-text-subtle'>Eligibility</span>
					</h1>
					<p className='text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed'>
						Join the StartX community and accelerate your
						entrepreneurial journey
					</p>
				</div>

				<Card className='bg-card/50 backdrop-blur-sm border-border/50 shadow-xl'>
					<CardHeader>
						<CardTitle className='text-2xl font-display'>
							Application Form
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
							<div className='grid md:grid-cols-2 gap-6'>
								<div className='space-y-2'>
									<Label
										htmlFor='firstName'
										className='text-sm font-medium'>
										First Name *
									</Label>
									<Input
										id='firstName'
										required
										className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									/>
								</div>
								<div className='space-y-2'>
									<Label
										htmlFor='lastName'
										className='text-sm font-medium'>
										Last Name *
									</Label>
									<Input
										id='lastName'
										required
										className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='email'
									className='text-sm font-medium'>
									Email Address *
								</Label>
								<Input
									id='email'
									type='email'
									required
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='phone'
									className='text-sm font-medium'>
									Phone Number *
								</Label>
								<Input
									id='phone'
									type='tel'
									required
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='campus'
									className='text-sm font-medium'>
									Campus / University *
								</Label>
								<Input
									id='campus'
									required
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									placeholder='e.g., Stanford University'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='year'
									className='text-sm font-medium'>
									Year of Study *
								</Label>
								<Select required>
									<SelectTrigger className='bg-background border-border'>
										<SelectValue placeholder='Select your year' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='freshman'>
											Freshman
										</SelectItem>
										<SelectItem value='sophomore'>
											Sophomore
										</SelectItem>
										<SelectItem value='junior'>
											Junior
										</SelectItem>
										<SelectItem value='senior'>
											Senior
										</SelectItem>
										<SelectItem value='graduate'>
											Graduate Student
										</SelectItem>
										<SelectItem value='alumni'>
											Alumni
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='interests'
									className='text-sm font-medium'>
									Skills / Interests *
								</Label>
								<Input
									id='interests'
									required
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-11'
									placeholder='e.g., Product Design, AI, Marketing'
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='experience'
									className='text-sm font-medium'>
									Previous Entrepreneurial Experience
								</Label>
								<Textarea
									id='experience'
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors min-h-24 resize-none'
									placeholder="Tell us about any startups, projects, or entrepreneurial activities you've been involved in"
								/>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='motivation'
									className='text-sm font-medium'>
									Why do you want to join StartX? *
								</Label>
								<Textarea
									id='motivation'
									required
									className='bg-background/50 border-border/50 focus:border-primary/50 transition-colors min-h-32 resize-none'
									placeholder='Share your motivation and what you hope to achieve through StartX'
								/>
							</div>

							<Button
								type='submit'
								className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20'>
								Submit Application
							</Button>
						</form>
					</CardContent>
				</Card>

				{/* Eligibility Criteria */}
				<Card className='mt-8 bg-card/50 backdrop-blur-sm border-border/50'>
					<CardHeader>
						<CardTitle className='text-xl font-display flex items-center gap-3'>
							<div className='flex items-center gap-2'>
								<CheckCircle
									className='w-5 h-5 text-primary'
									strokeWidth={2}
								/>
								<div className='h-4 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent' />
							</div>
							Eligibility Criteria
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div className='flex gap-3'>
							<CheckCircle
								className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
								strokeWidth={2}
							/>
							<p className='text-muted-foreground/80'>
								Currently enrolled student or recent alumni
								(within 2 years)
							</p>
						</div>
						<div className='flex gap-3'>
							<CheckCircle
								className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
								strokeWidth={2}
							/>
							<p className='text-muted-foreground/80'>
								Passion for entrepreneurship and innovation
							</p>
						</div>
						<div className='flex gap-3'>
							<CheckCircle
								className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
								strokeWidth={2}
							/>
							<p className='text-muted-foreground/80'>
								Commitment to actively participate in the
								community
							</p>
						</div>
						<div className='flex gap-3'>
							<CheckCircle
								className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
								strokeWidth={2}
							/>
							<p className='text-muted-foreground/80'>
								Interest in building or joining a startup
							</p>
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
