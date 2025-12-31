import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	User,
	LogOut,
	FileText,
	Clock,
	CheckCircle,
	ChevronDown,
	Menu,
	X,
	Shield,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
	{ name: 'Home', path: '/' },
	{ name: 'Events', path: '/events' },
	{ name: 'Learn', path: '/learn' },
	{ name: 'Showcase', path: '/showcase' },
	{ name: 'Explore', path: '/explore' },
];

export default function Header() {
	const location = useLocation();
	const { user, isAuthenticated, logout } = useAuth();
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const isActive = (path: string) => location.pathname === path;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest('.user-menu')) {
				setShowUserMenu(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	const getApplicationStatusBadge = () => {
		if (!user || user.role === 'member' || user.role === 'admin')
			return null;

		const statusConfig = {
			none: null,
			draft: { icon: FileText, text: 'Draft Saved', color: 'gray' },
			submitted: { icon: Clock, text: 'Submitted', color: 'blue' },
			under_review: {
				icon: Clock,
				text: 'Under Review',
				color: 'yellow',
			},
			approved: { icon: CheckCircle, text: 'Approved', color: 'emerald' },
			rejected: null,
		};

		if (!user.applicationStatus) return null;

		const status = statusConfig[user.applicationStatus];
		if (!status) return null;

		const Icon = status.icon;
		return (
			<div
				className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-${status.color}-500/10 border border-${status.color}-500/20`}>
				<Icon className={`w-3.5 h-3.5 text-${status.color}-400`} />
				<span
					className={`text-xs font-medium text-${status.color}-400`}>
					{status.text}
				</span>
			</div>
		);
	};

	const getRoleBadge = () => {
		if (!user) return null;

		if (user.role === 'admin') {
			return (
				<span className='px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400'>
					Admin
				</span>
			);
		}

		if (user.role === 'member') {
			return (
				<span className='px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400'>
					Member
				</span>
			);
		}

		return null;
	};

	return (
		<>
			<header
				id='app-header'
				className='fixed top-0 left-0 right-0 z-50 px-6 pt-6'>
				<div className='max-w-7xl mx-auto'>
					<nav
						className='
						relative
						rounded-full
						px-4 md:px-6 py-3
						bg-white/5
						backdrop-blur-xl
						border border-white/10
						shadow-[0_8px_40px_rgba(0,0,0,0.4)]
						before:absolute before:inset-0 before:rounded-full
						before:bg-gradient-to-b before:from-white/10 before:to-transparent
						before:pointer-events-none
					'>
						<div className='relative z-10 flex items-center justify-between'>
							{/* Logo */}
							<Link
								to='/'
								className='
								px-2 flex items-center
								transition-opacity duration-300 hover:opacity-80
							'>
								<img
									src='/image.png'
									alt='StartX Logo'
									className='h-8 w-auto'
								/>
							</Link>

							{/* Navigation Links - Desktop with Tubelight Effect */}
							<div className='hidden md:flex items-center space-x-1'>
								{navLinks.map((link) => {
									const active = isActive(link.path);

									return (
										<Link
											key={link.path}
											to={link.path}
											className={`
											relative px-5 py-2 rounded-full text-sm font-medium
											transition-all duration-300
											${active ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}
										`}>
											{link.name}
											{active && (
												<motion.div
													layoutId='navbar-indicator'
													className='absolute inset-0 bg-blue-500/10 rounded-full -z-10'
													initial={false}
													transition={{
														type: 'spring',
														stiffness: 380,
														damping: 30,
													}}>
													{/* Tubelight glow effect */}
													<div className='absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-t-full shadow-[0_0_10px_rgba(19,40,85,0.5)]'>
														<div className='absolute w-12 h-6 bg-blue-400/30 rounded-full blur-md -top-2 -left-2' />
														<div className='absolute w-8 h-6 bg-blue-400/20 rounded-full blur-md -top-1' />
														<div className='absolute w-4 h-4 bg-blue-400/30 rounded-full blur-sm top-0 left-2' />
													</div>
												</motion.div>
											)}
										</Link>
									);
								})}
							</div>

							{/* Actions */}
							<div className='flex items-center gap-2 md:gap-3'>
								{!isAuthenticated ? (
									<>
										<Link
											to='/login'
											className='
											relative
											bg-white/90 text-black
											px-4 md:px-6 py-2 md:py-2.5 rounded-full
											text-sm font-semibold tracking-wide
											shadow-lg
											transition-all duration-300
											hover:bg-blue-400
											hover:shadow-[0_0_25px_rgba(19,40,85,0.6)]
										'>
											Sign In
										</Link>

										{/* Mobile Menu Button */}
										<button
											onClick={() =>
												setShowMobileMenu(
													!showMobileMenu
												)
											}
											className='md:hidden p-2 text-white hover:text-blue-400 transition-colors'>
											{showMobileMenu ? (
												<X className='w-6 h-6' />
											) : (
												<Menu className='w-6 h-6' />
											)}
										</button>
									</>
								) : (
									<>
										{/* Show "Apply for Membership" button for non-members - Hidden on small screens */}
										{user?.role === 'user' &&
											(user.applicationStatus ===
												'none' ||
												user.applicationStatus ===
													'draft') && (
												<Link
													to='/apply-membership'
													className='
													hidden sm:block
													relative
													bg-blue-500 text-black
													px-4 md:px-5 py-2 md:py-2.5 rounded-full
													text-sm font-semibold tracking-wide
													shadow-lg
													transition-all duration-300
													hover:bg-blue-400
													hover:shadow-[0_0_25px_rgba(19,40,85,0.6)]
												'>
													Apply for Membership
												</Link>
											)}

										{/* Show application status badge for pending applications */}
										{user?.role === 'user' &&
											user.applicationStatus !== 'none' &&
											user.applicationStatus !==
												'draft' && (
												<Link
													to='/apply-membership'
													className='hidden sm:block hover:opacity-80 transition-opacity'>
													{getApplicationStatusBadge()}
												</Link>
											)}

										{/* User Menu */}
										<div className='relative user-menu'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setShowUserMenu(
														!showUserMenu
													);
												}}
												className='flex items-center gap-2 md:gap-2.5 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 group'>
												<div className='flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30'>
													<User className='w-4 h-4 text-blue-400' />
												</div>
												<span className='text-sm font-medium text-white hidden lg:block'>
													{user?.name}
												</span>
												<ChevronDown
													className={`w-4 h-4 text-gray-400 transition-transform ${
														showUserMenu
															? 'rotate-180'
															: ''
													}`}
												/>
											</button>

											{/* Dropdown Menu */}
											<AnimatePresence>
												{showUserMenu && (
													<motion.div
														initial={{
															opacity: 0,
															scale: 0.95,
															y: -10,
														}}
														animate={{
															opacity: 1,
															scale: 1,
															y: 0,
														}}
														exit={{
															opacity: 0,
															scale: 0.95,
															y: -10,
														}}
														transition={{
															duration: 0.15,
															ease: 'easeOut',
														}}
														className='absolute right-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden'>
														{/* User Info */}
														<div className='px-4 py-4 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent'>
															<div className='flex items-center justify-between mb-2'>
																<p className='text-sm font-semibold text-white'>
																	{user?.name}
																</p>
																{getRoleBadge()}
															</div>
															<p className='text-xs text-gray-400'>
																{user?.email}
															</p>
														</div>

														{/* Menu Items */}
														<div className='py-2'>
															{/* Show Admin Dashboard for admins */}
															{user?.role ===
																'admin' && (
																<Link
																	to='/admin'
																	onClick={() => {
																		setShowUserMenu(
																			false
																		);
																	}}
																	className='w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-200 flex items-center gap-3 group'>
																	<Shield className='w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform' />
																	<span>
																		Admin
																		Dashboard
																	</span>
																</Link>
															)}

															{/* Show membership application for non-members */}
															{user?.role ===
																'user' && (
																<Link
																	to='/apply-membership'
																	onClick={() => {
																		setShowUserMenu(
																			false
																		);
																	}}
																	className='w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-blue-500/10 transition-all duration-200 flex items-center gap-3 group'>
																	<FileText className='w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform' />
																	<span>
																		{user.applicationStatus ===
																			'none' ||
																		user.applicationStatus ===
																			'draft'
																			? 'Apply for Membership'
																			: 'View Application'}
																	</span>
																</Link>
															)}

															<button
																onClick={() => {
																	logout();
																	setShowUserMenu(
																		false
																	);
																}}
																className='w-full px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-3 group'>
																<LogOut className='w-4 h-4 text-gray-400 group-hover:text-gray-300 group-hover:scale-110 transition-all' />
																<span>
																	Sign Out
																</span>
															</button>
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>

										{/* Mobile Menu Button for authenticated users */}
										<button
											onClick={() =>
												setShowMobileMenu(
													!showMobileMenu
												)
											}
											className='md:hidden p-2 text-white hover:text-blue-400 transition-colors'>
											{showMobileMenu ? (
												<X className='w-6 h-6' />
											) : (
												<Menu className='w-6 h-6' />
											)}
										</button>
									</>
								)}
							</div>
						</div>
					</nav>
				</div>
			</header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{showMobileMenu && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='fixed inset-0 z-40 md:hidden'>
						<div
							className='absolute inset-0 bg-black/90 backdrop-blur-sm'
							onClick={() => setShowMobileMenu(false)}
						/>
						<motion.div
							initial={{ opacity: 0, y: -20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							transition={{
								duration: 0.2,
								ease: 'easeOut',
							}}
							className='absolute top-24 left-4 right-4 bg-black/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden'>
							<div className='p-2 space-y-1'>
								{navLinks.map((link, index) => {
									const active = isActive(link.path);
									return (
										<motion.div
											key={link.path}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: index * 0.05,
												duration: 0.2,
											}}>
											<Link
												to={link.path}
												onClick={() =>
													setShowMobileMenu(false)
												}
												className={`
											relative block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
											${active ? 'text-blue-400' : 'text-gray-300 hover:text-white hover:bg-white/5'}
										`}>
												{link.name}
												{active && (
													<motion.div
														layoutId='mobile-navbar-indicator'
														className='absolute inset-0 bg-blue-500/10 rounded-xl -z-10'
														initial={false}
														transition={{
															type: 'spring',
															stiffness: 380,
															damping: 30,
														}}>
														{/* Mobile tubelight glow on left side */}
														<div className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-r-full shadow-[0_0_10px_rgba(19,40,85,0.5)]'>
															<div className='absolute w-6 h-12 bg-blue-400/30 rounded-full blur-md -left-2 -top-2' />
															<div className='absolute w-4 h-8 bg-blue-400/20 rounded-full blur-md -left-1' />
														</div>
													</motion.div>
												)}
											</Link>
										</motion.div>
									);
								})}

								{/* Show membership application link in mobile menu for authenticated non-members */}
								{isAuthenticated && user?.role === 'user' && (
									<>
										<div className='h-px bg-gray-800 my-2' />
										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: navLinks.length * 0.05,
												duration: 0.2,
											}}>
											<Link
												to='/apply-membership'
												onClick={() =>
													setShowMobileMenu(false)
												}
												className='block px-4 py-3 rounded-xl text-base font-medium text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300'>
												{user.applicationStatus ===
													'none' ||
												user.applicationStatus ===
													'draft'
													? 'Apply for Membership'
													: 'View Application'}
											</Link>
										</motion.div>
									</>
								)}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
