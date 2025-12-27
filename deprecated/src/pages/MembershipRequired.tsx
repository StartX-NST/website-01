import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MembershipRequired() {
	return (
		<div className='min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6 bg-subtle-pattern relative'>
			<div className='absolute inset-0 bg-grid-pattern opacity-[0.02]' />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-2xl relative z-10'>
				<Card className='bg-card/50 backdrop-blur-sm border-border/50 shadow-xl'>
					<CardHeader className='text-center space-y-4 pb-8'>
						<div className='mx-auto w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center'>
							<Lock
								className='w-10 h-10 text-primary'
								strokeWidth={1.5}
							/>
						</div>
						<CardTitle className='text-3xl font-display font-bold tracking-tight'>
							Membership Required
						</CardTitle>
						<CardDescription className='text-base text-muted-foreground/80 max-w-md mx-auto'>
							This content is exclusive to StartX members. Apply
							for membership to unlock all courses, resources, and
							community benefits.
						</CardDescription>
					</CardHeader>

					<CardContent className='space-y-6'>
						{/* Benefits */}
						<div className='bg-muted/30 rounded-xl p-6 space-y-4'>
							<h3 className='font-semibold text-lg mb-4'>
								Member Benefits:
							</h3>
							<ul className='space-y-3'>
								{[
									'Access to all learning courses and materials',
									'Exclusive workshops and networking events',
									'$10K+ in startup tools and credits',
									'Mentorship from successful founders',
									'Priority support and resources',
								].map((benefit, i) => (
									<li
										key={i}
										className='flex items-start gap-3 text-sm text-muted-foreground/90'>
										<div className='w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5'>
											<div className='w-2 h-2 bg-primary rounded-full' />
										</div>
										<span>{benefit}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Actions */}
						<div className='flex flex-col sm:flex-row gap-4 pt-4'>
							<Button
								asChild
								size='lg'
								className='flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 group'>
								<Link to='/apply-membership'>
									Apply for Membership
									<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
								</Link>
							</Button>
							<Button
								asChild
								size='lg'
								variant='outline'
								className='flex-1 border-border/50 hover:bg-muted/50 py-6'>
								<Link to='/'>Back to Home</Link>
							</Button>
						</div>

						<p className='text-xs text-center text-muted-foreground/70 pt-2'>
							Membership applications are reviewed within 48 hours
						</p>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
