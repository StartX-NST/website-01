import {
	Home,
	Calendar,
	BookOpen,
	Trophy,
	Compass,
	Menu,
	X,
	LogOut,
	User,
	CheckCircle,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const menuItems = [
	{ title: 'Home', url: '/', icon: Home },
	{ title: 'Events', url: '/events', icon: Calendar },
	{ title: 'Learn', url: '/learn', icon: BookOpen },
	{ title: 'Showcase', url: '/showcase', icon: Trophy },
	{ title: 'Explore', url: '/explore', icon: Compass },
];

export function AppNavbar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const { user, isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
		setIsMobileOpen(false);
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<>
			{/* Desktop & Mobile Navbar */}
			<nav className='sticky top-0 z-40 w-full bg-card/50 backdrop-blur-xl border-b border-border/50 shadow-sm'>
				<div className='max-w-7xl mx-auto px-6 lg:px-8'>
					<div className='flex items-center justify-between h-16'>
						{/* Logo */}
						<NavLink
							to='/'
							className='flex items-center gap-2 group'>
							<div className='w-1 h-8 bg-primary rounded-full group-hover:h-10 transition-all duration-200' />
							<h1 className='text-2xl font-display font-bold text-primary'>
								STARTX
							</h1>
						</NavLink>

						{/* Desktop Navigation */}
						<div className='hidden md:flex items-center gap-1'>
							{menuItems.map((item) => (
								<NavLink
									key={item.url}
									to={item.url}
									end={item.url === '/'}
									className='flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-muted/50 text-muted-foreground hover:text-foreground group relative'
									activeClassName='bg-muted text-foreground shadow-sm'>
									{/* Active indicator */}
									<div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-200 group-[.active]:w-8' />

									<item.icon
										className='w-4 h-4 transition-colors'
										strokeWidth={2}
									/>
									<span className='font-medium text-sm'>
										{item.title}
									</span>
								</NavLink>
							))}
						</div>

						{/* Desktop Action Buttons */}
						<div className='hidden md:flex items-center gap-3'>
							{!isAuthenticated ? (
								<>
									<Button
										asChild
										variant='outline'
										className='border-border hover:bg-muted/50 hover:border-primary/30 transition-all duration-200'
										size='sm'>
										<NavLink to='/login'>
											Login / Register
										</NavLink>
									</Button>
								</>
							) : (
								<div className='flex items-center gap-3'>
									{user?.isMember && (
										<div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20'>
											<CheckCircle
												className='w-4 h-4 text-primary'
												strokeWidth={2}
											/>
											<span className='text-xs font-medium text-primary'>
												Member
											</span>
										</div>
									)}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												className='flex items-center gap-2 hover:bg-muted/50 transition-all duration-200'
												size='sm'>
												<Avatar className='w-8 h-8 border-2 border-primary/20'>
													<AvatarFallback className='bg-primary/10 text-primary text-xs font-semibold'>
														{getInitials(
															user?.name || 'User'
														)}
													</AvatarFallback>
												</Avatar>
												<span className='font-medium text-sm'>
													{user?.name}
												</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align='end'
											className='w-56'>
											<DropdownMenuLabel>
												My Account
											</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className='cursor-pointer'
												asChild>
												<div className='flex items-center gap-2'>
													<User
														className='w-4 h-4'
														strokeWidth={2}
													/>
													<span>Profile</span>
												</div>
											</DropdownMenuItem>
											{!user?.isMember && (
												<DropdownMenuItem
													className='cursor-pointer'
													asChild>
													<NavLink
														to='/apply-membership'
														className='flex items-center gap-2 w-full'>
														<CheckCircle
															className='w-4 h-4'
															strokeWidth={2}
														/>
														<span>
															Apply for Membership
														</span>
													</NavLink>
												</DropdownMenuItem>
											)}
											<DropdownMenuSeparator />
											<DropdownMenuItem
												onClick={handleLogout}
												className='cursor-pointer text-destructive focus:text-destructive'>
												<div className='flex items-center gap-2'>
													<LogOut
														className='w-4 h-4'
														strokeWidth={2}
													/>
													<span>Logout</span>
												</div>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMobileOpen(!isMobileOpen)}
							className='md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200'>
							{isMobileOpen ? (
								<X className='w-6 h-6' />
							) : (
								<Menu className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-30 top-16'
							onClick={() => setIsMobileOpen(false)}
						/>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className='md:hidden fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-xl z-40'>
							<div className='max-w-7xl mx-auto px-6 py-6 space-y-4'>
								{/* Mobile Navigation Links */}
								<div className='space-y-1'>
									{menuItems.map((item) => (
										<NavLink
											key={item.url}
											to={item.url}
											end={item.url === '/'}
											className='flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
											activeClassName='bg-muted text-foreground shadow-sm'
											onClick={() =>
												setIsMobileOpen(false)
											}>
											<item.icon
												className='w-5 h-5'
												strokeWidth={2}
											/>
											<span className='font-medium'>
												{item.title}
											</span>
										</NavLink>
									))}
								</div>

								{/* Mobile Action Buttons */}
								<div className='space-y-2 pt-4 border-t border-border/50'>
									{!isAuthenticated ? (
										<Button
											asChild
											className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
											onClick={() =>
												setIsMobileOpen(false)
											}>
											<NavLink to='/login'>
												Login / Register
											</NavLink>
										</Button>
									) : (
										<>
											<div className='flex items-center gap-3 px-4 py-3 rounded-lg bg-muted/50'>
												<Avatar className='w-10 h-10 border-2 border-primary/20'>
													<AvatarFallback className='bg-primary/10 text-primary text-sm font-semibold'>
														{getInitials(
															user?.name || 'User'
														)}
													</AvatarFallback>
												</Avatar>
												<div className='flex-1'>
													<p className='font-medium text-sm'>
														{user?.name}
													</p>
													<p className='text-xs text-muted-foreground'>
														{user?.email}
													</p>
												</div>
												{user?.isMember && (
													<CheckCircle
														className='w-5 h-5 text-primary'
														strokeWidth={2}
													/>
												)}
											</div>
											{!user?.isMember && (
												<Button
													asChild
													className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold'
													onClick={() =>
														setIsMobileOpen(false)
													}>
													<NavLink to='/apply-membership'>
														Apply for Membership
													</NavLink>
												</Button>
											)}
											<Button
												variant='outline'
												className='w-full border-border hover:bg-muted/50 text-destructive hover:text-destructive'
												onClick={handleLogout}>
												<LogOut
													className='w-4 h-4 mr-2'
													strokeWidth={2}
												/>
												Logout
											</Button>
										</>
									)}
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
