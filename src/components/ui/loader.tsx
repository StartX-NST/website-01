import { cn } from '@/lib/utils';

interface LoaderProps {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export function Loader({ size = 'md', className }: LoaderProps) {
	const sizeClasses = {
		sm: 'w-5 h-5 border-2',
		md: 'w-8 h-8 border-2',
		lg: 'w-12 h-12 border-3',
	};

	return (
		<div
			className={cn(
				'inline-block rounded-full border-emerald-500/20 border-t-emerald-500 animate-spin',
				sizeClasses[size],
				className
			)}
			role='status'
			aria-label='Loading'
		/>
	);
}

interface LoadingScreenProps {
	message?: string;
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
	return (
		<div className='fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50'>
			{/* Background grid */}
			<div className='absolute inset-0 pointer-events-none'>
				<div
					className='absolute inset-0 opacity-[0.03]'
					style={{
						backgroundImage: `
							linear-gradient(to right, #ffffff 1px, transparent 1px),
							linear-gradient(to bottom, #ffffff 1px, transparent 1px)
						`,
						backgroundSize: '80px 80px',
					}}
				/>
			</div>

			{/* Glow effect */}
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]' />

			{/* Content */}
			<div className='relative z-10 flex flex-col items-center gap-4'>
				<Loader size='lg' />
				{message && (
					<p className='text-gray-400 text-sm font-medium animate-pulse'>
						{message}
					</p>
				)}
			</div>
		</div>
	);
}
