import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Instagram } from 'lucide-react';
import { TextHoverEffect, FooterBackgroundGradient } from './hover-footer';

export function Footer() {
	// Footer link data
	const footerLinks = [
		{
			title: 'About Us',
			links: [
				{ label: 'Our Mission', href: '#about' },
				{ label: 'Success Stories', href: '/showcase' },
				{ label: 'Partner With Us', href: '#partner' },
				{ label: 'Careers', href: '#careers' },
			],
		},
		{
			title: 'Platform',
			links: [
				{ label: 'Events', href: '/events' },
				{ label: 'Learn', href: '/learn' },
				{ label: 'Showcase', href: '/showcase' },
				{ label: 'Opportunities', href: '/opportunities' },
			],
		},
	];

	// Contact info data
	const contactInfo = [
		{
			icon: (
				<Mail
					size={18}
					className='text-blue-400'
				/>
			),
			text: 'startx.ru@newtonschool.co',
			href: 'mailto:startx.ru@newtonschool.co',
		},
		{
			icon: (
				<MapPin
					size={18}
					className='text-blue-400'
				/>
			),
			text: 'NST, Rishihood University',
		},
	];

	// Social media icons
	const socialLinks = [
		{
			icon: <Instagram size={20} />,
			label: 'Instagram',
			href: 'https://www.instagram.com/startx.nst?igsh=MWlxNWZieHQ1d3ltcg==',
		},
		{
			icon: <Linkedin size={20} />,
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/company/startx-nst/',
		},
	];

	return (
		<footer className='bg-black relative h-fit overflow-hidden border-t border-gray-800/50'>
			<div className='max-w-7xl mx-auto px-6 py-16 md:py-20 z-40 relative'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12'>
					{/* Brand section */}
					<div className='flex flex-col space-y-4'>
						<Link
							to='/'
							className='flex items-center space-x-2'>
							<img
								src='/image.png'
								alt='StartX Logo'
								className='h-8 w-auto'
							/>
						</Link>
						<p className='text-sm leading-relaxed text-gray-400'>
							A student-founder ecosystem for learning, building,
							and shipping. Join 1000+ builders creating the
							future.
						</p>
					</div>

					{/* Footer link sections */}
					{footerLinks.map((section) => (
						<div key={section.title}>
							<h4 className='text-white text-lg font-semibold mb-6'>
								{section.title}
							</h4>
							<ul className='space-y-3'>
								{section.links.map((link) => (
									<li
										key={link.label}
										className='relative'>
										<Link
											to={link.href}
											className='text-gray-400 hover:text-blue-400 transition-colors'>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Contact section */}
					<div>
						<h4 className='text-white text-lg font-semibold mb-6'>
							Contact Us
						</h4>
						<ul className='space-y-4'>
							{contactInfo.map((item, i) => (
								<li
									key={i}
									className='flex items-center space-x-3'>
									{item.icon}
									{item.href ? (
										<a
											href={item.href}
											className='text-gray-400 hover:text-blue-400 transition-colors'>
											{item.text}
										</a>
									) : (
										<span className='text-gray-400 hover:text-blue-400 transition-colors'>
											{item.text}
										</span>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>

				<hr className='border-t border-gray-700 my-8' />

				{/* Footer bottom */}
				<div className='flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0'>
					{/* Social icons */}
					<div className='flex space-x-6 text-gray-400'>
						{socialLinks.map(({ icon, label, href }) => (
							<a
								key={label}
								href={href}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={label}
								className='hover:text-blue-400 transition-colors'>
								{icon}
							</a>
						))}
					</div>

					{/* Copyright */}
					<p className='text-gray-400 text-center md:text-left'>
						&copy; {new Date().getFullYear()} StartX. All rights
						reserved.
					</p>
				</div>
			</div>

			{/* Text hover effect */}
			<div className='lg:flex hidden h-[30rem] -mt-20 -mb-32'>
				<TextHoverEffect
					text='STARTX'
					className='z-50'
				/>
			</div>

			<FooterBackgroundGradient />
		</footer>
	);
}
