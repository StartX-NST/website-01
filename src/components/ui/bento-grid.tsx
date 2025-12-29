import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BentoGrid = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				'grid w-full auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4',
				className
			)}>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
}: {
	name: string;
	className: string;
	background: ReactNode;
	Icon?: any;
	description: string;
	href: string;
	cta: string;
}) => (
	<Link
		to={href}
		key={name}
		className={cn(
			'group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl',
			'bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm',
			'border border-gray-800 hover:border-blue-500/40',
			'transform-gpu transition-all duration-500',
			'hover:shadow-[0_0_40px_rgba(19,40,85,0.15)]',
			'hover:-translate-y-1',
			className
		)}>
		{/* Background with gradient overlay */}
		<div className='absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity'>
			{background}
			<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent' />
		</div>

		{/* Blue glow effect */}
		<div className='absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

		{/* Content */}
		<div className='relative z-10 flex flex-col h-full p-6'>
			{/* Icon - only render if provided */}
			{Icon && (
				<div className='flex-shrink-0 mb-4'>
					<div className='relative inline-flex'>
						<div className='absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:bg-blue-500/30 transition-all' />
						<div className='relative bg-blue-500/10 p-2.5 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-all'>
							<Icon
								className='w-6 h-6 text-blue-400 transition-transform group-hover:scale-110'
								strokeWidth={1.5}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Text content */}
			<div className='flex-1 flex flex-col justify-end transform-gpu transition-all duration-300 group-hover:-translate-y-2'>
				<h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors'>
					{name}
				</h3>
				<p className='text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2'>
					{description}
				</p>

				{/* CTA */}
				<div className='inline-flex items-center text-sm font-medium text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
					<span>{cta}</span>
					<ArrowRight className='w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform' />
				</div>
			</div>
		</div>

		{/* Overlay on hover */}
		<div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]' />
	</Link>
);

export { BentoCard, BentoGrid };
