import {
	Home,
	Calendar,
	BookOpen,
	Trophy,
	Compass,
	Menu,
	X,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
	{ title: 'Home', url: '/', icon: Home },
	{ title: 'Events', url: '/events', icon: Calendar },
	{ title: 'Learn', url: '/learn', icon: BookOpen },
	{ title: 'Showcase', url: '/showcase', icon: Trophy },
	{ title: 'Explore', url: '/explore', icon: Compass },
];

export function AppSidebar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const SidebarContent = () => (
		<>
			{/* Logo */}
			<div className='p-6 border-b border-sidebar-border'>
				<div className='flex items-center gap-2'>
					<div className='w-1 h-8 bg-primary rounded-full' />
					<h1 className='text-2xl font-display font-bold text-primary'>
						STARTX
					</h1>
				</div>
			</div>

			{/* Navigation */}
			<nav className='flex-1 p-4 space-y-1'>
				{menuItems.map((item) => (
					<NavLink
						key={item.url}
						to={item.url}
						end={item.url === '/'}
						className='flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-sidebar-accent/50 group relative overflow-hidden'
						activeClassName='bg-sidebar-accent/70 shadow-sm'
						onClick={() => setIsMobileOpen(false)}>
						{/* Active indicator */}
						<div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full transition-all duration-200 group-[.active]:h-8' />

						<item.icon
							className='w-5 h-5 transition-colors group-hover:text-primary'
							strokeWidth={1.5}
						/>
						<span className='font-medium text-sm'>
							{item.title}
						</span>
					</NavLink>
				))}
			</nav>

			{/* Bottom Actions */}
			<div className='p-4 space-y-2 border-t border-sidebar-border'>
				<Button
					asChild
					className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm hover:shadow-md hover:shadow-primary/20 transition-all duration-200'>
					<NavLink
						to='/check-eligibility'
						onClick={() => setIsMobileOpen(false)}>
						Check Eligibility
					</NavLink>
				</Button>
				<Button
					asChild
					variant='outline'
					className='w-full border-border hover:bg-sidebar-accent/50 hover:text-white transition-all duration-200'>
					<NavLink
						to='/login'
						onClick={() => setIsMobileOpen(false)}>
						Member Login
					</NavLink>
				</Button>
			</div>
		</>
	);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={() => setIsMobileOpen(!isMobileOpen)}
				className='lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-card rounded-lg border border-border shadow-lg hover:shadow-xl transition-all duration-200 hover:border-primary/30'>
				{isMobileOpen ? (
					<X className='w-6 h-6' />
				) : (
					<Menu className='w-6 h-6' />
				)}
			</button>

			{/* Desktop Sidebar */}
			<aside className='hidden lg:flex lg:flex-col lg:w-64 bg-sidebar/50 backdrop-blur-sm border-r border-sidebar-border h-screen sticky top-0'>
				<SidebarContent />
			</aside>

			{/* Mobile Sidebar */}
			<AnimatePresence>
				{isMobileOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40'
							onClick={() => setIsMobileOpen(false)}
						/>
						<motion.aside
							initial={{ x: -280 }}
							animate={{ x: 0 }}
							exit={{ x: -280 }}
							transition={{ type: 'spring', damping: 25 }}
							className='lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 flex flex-col'>
							<SidebarContent />
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
