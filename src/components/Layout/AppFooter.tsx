import { NavLink } from '@/components/NavLink';
import {
	Home,
	Calendar,
	BookOpen,
	Trophy,
	Compass,
	Mail,
	Github,
	Twitter,
	Linkedin,
} from 'lucide-react';

const navigation = {
	main: [
		{ name: 'Home', href: '/', icon: Home },
		{ name: 'Events', href: '/events', icon: Calendar },
		{ name: 'Learn', href: '/learn', icon: BookOpen },
		{ name: 'Showcase', href: '/showcase', icon: Trophy },
		{ name: 'Explore', href: '/explore', icon: Compass },
	],
	social: [
		{
			name: 'Twitter',
			href: '#',
			icon: Twitter,
		},
		{
			name: 'GitHub',
			href: '#',
			icon: Github,
		},
		{
			name: 'LinkedIn',
			href: '#',
			icon: Linkedin,
		},
	],
};

export function AppFooter() {
	return (
		<footer className='bg-card/50 backdrop-blur-sm border-t border-border/50'>
			<div className='max-w-7xl mx-auto px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{/* Brand */}
					<div className='space-y-4'>
						<div className='flex items-center gap-2'>
							<div className='w-1 h-8 bg-primary rounded-full' />
							<h2 className='text-2xl font-display font-bold text-primary'>
								STARTX
							</h2>
						</div>
						<p className='text-sm text-muted-foreground/80 max-w-xs leading-relaxed'>
							Empowering the next generation of entrepreneurs with
							resources, community, and opportunities.
						</p>
					</div>

					{/* Quick Links */}
					<div className='space-y-4'>
						<h3 className='text-sm font-semibold text-foreground'>
							Quick Links
						</h3>
						<ul className='space-y-2'>
							{navigation.main.map((item) => (
								<li key={item.name}>
									<NavLink
										to={item.href}
										className='text-sm text-muted-foreground/80 hover:text-primary transition-colors duration-200 flex items-center gap-2 group'>
										<item.icon
											className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity'
											strokeWidth={2}
										/>
										<span>{item.name}</span>
									</NavLink>
								</li>
							))}
						</ul>
					</div>

					{/* Connect */}
					<div className='space-y-4'>
						<h3 className='text-sm font-semibold text-foreground'>
							Connect
						</h3>
						<div className='flex gap-4'>
							{navigation.social.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className='p-2 rounded-lg bg-accent/50 hover:bg-accent text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110'
									aria-label={item.name}>
									<item.icon
										className='w-5 h-5'
										strokeWidth={2}
									/>
								</a>
							))}
						</div>
						<div className='pt-4'>
							<a
								href='mailto:contact@startx.com'
								className='text-sm text-muted-foreground/80 hover:text-primary transition-colors duration-200 flex items-center gap-2'>
								<Mail
									className='w-4 h-4'
									strokeWidth={2}
								/>
								contact@startx.com
							</a>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4'>
					<p className='text-sm text-muted-foreground/70'>
						© {new Date().getFullYear()} StartX. All rights
						reserved.
					</p>
					<div className='flex gap-6 text-sm text-muted-foreground/70'>
						<a
							href='#'
							className='hover:text-primary transition-colors duration-200'>
							Privacy Policy
						</a>
						<a
							href='#'
							className='hover:text-primary transition-colors duration-200'>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
