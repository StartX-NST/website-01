import { useState } from 'react';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';
import { BGPattern } from '@/components/ui/bg-pattern';

// Mock event data
const eventsData = [
	{
		id: '1',
		title: 'Building Your MVP in 48 Hours',
		description:
			'Learn rapid prototyping techniques and frameworks to build a functional MVP over a weekend. Get hands-on experience with tools used by successful startups.',
		date: 'Jan 15, 2026',
		time: '10:00 AM - 6:00 PM',
		location: 'Online (Zoom)',
		type: 'workshop' as const,
		attendees: 45,
		maxAttendees: 50,
		status: 'upcoming' as const,
	},
	{
		id: '2',
		title: 'From Zero to First Customer',
		description:
			'A founder shares their journey of acquiring the first 100 customers without spending on ads. Real tactics, real results.',
		date: 'Jan 18, 2026',
		time: '7:00 PM - 8:30 PM',
		location: 'Building 360, Room 105',
		type: 'talk' as const,
		attendees: 32,
		maxAttendees: 60,
		status: 'upcoming' as const,
	},
	{
		id: '3',
		title: 'Fundraising Panel: Seed to Series A',
		description:
			'VCs and founders discuss what actually matters when raising your first rounds. Q&A session included.',
		date: 'Jan 22, 2026',
		time: '6:00 PM - 8:00 PM',
		location: 'Online (Zoom)',
		type: 'panel' as const,
		attendees: 78,
		maxAttendees: 100,
		status: 'upcoming' as const,
	},
	{
		id: '4',
		title: '48-Hour Startup Sprint',
		description:
			'Form teams, build products, pitch to judges. Win prizes, gain experience, and network with fellow builders.',
		date: 'Jan 25-27, 2026',
		time: 'All Weekend',
		location: 'Innovation Hub',
		type: 'competition' as const,
		attendees: 24,
		maxAttendees: 40,
		status: 'upcoming' as const,
	},
	{
		id: '5',
		title: 'Founder Coffee & Connect',
		description:
			'Casual networking session for founders to share challenges, exchange ideas, and build meaningful connections.',
		date: 'Jan 29, 2026',
		time: '9:00 AM - 11:00 AM',
		location: 'StartX Lounge',
		type: 'networking' as const,
		attendees: 18,
		maxAttendees: 30,
		status: 'upcoming' as const,
	},
	{
		id: '6',
		title: 'Product-Market Fit Workshop',
		description:
			'Deep dive into finding and validating product-market fit. Interactive exercises and real case studies included.',
		date: 'Dec 15, 2025',
		time: '2:00 PM - 5:00 PM',
		location: 'Online (Zoom)',
		type: 'workshop' as const,
		attendees: 50,
		maxAttendees: 50,
		status: 'completed' as const,
	},
	{
		id: '7',
		title: 'Design Thinking for Startups',
		description:
			'Learn how to apply design thinking principles to solve customer problems and create better products.',
		date: 'Dec 10, 2025',
		time: '4:00 PM - 7:00 PM',
		location: 'Design Lab',
		type: 'workshop' as const,
		attendees: 35,
		maxAttendees: 40,
		status: 'completed' as const,
	},
	{
		id: '8',
		title: 'Growth Hacking Masterclass',
		description:
			'Explore unconventional growth strategies used by unicorns in their early days. Actionable tactics you can implement immediately.',
		date: 'Dec 5, 2025',
		time: '6:00 PM - 8:00 PM',
		location: 'Online (Zoom)',
		type: 'talk' as const,
		attendees: 120,
		maxAttendees: 120,
		status: 'completed' as const,
	},
];

export default function Events() {
	const [selectedType, setSelectedType] = useState('all');
	const [selectedStatus, setSelectedStatus] = useState('all');

	// Filter events based on selected filters
	const filteredEvents = eventsData.filter((event) => {
		const typeMatch = selectedType === 'all' || event.type === selectedType;
		const statusMatch =
			selectedStatus === 'all' || event.status === selectedStatus;
		return typeMatch && statusMatch;
	});

	// Separate upcoming and past events
	const upcomingEvents = filteredEvents.filter(
		(e) => e.status === 'upcoming'
	);
	const pastEvents = filteredEvents.filter((e) => e.status === 'completed');

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black relative'>
				{/* Diagonal Stripes Background Pattern */}
				<BGPattern
					variant='diagonal-stripes'
					mask='fade-y'
					size={60}
					fill='rgba(255, 255, 255, 0.08)'
				/>

				{/* Events Section */}
				<section className='relative py-12 md:py-16 lg:py-20 px-6 overflow-hidden'>
					<div className='relative z-10 max-w-7xl mx-auto'>
						{/* Filters */}
						<EventFilters
							selectedType={selectedType}
							selectedStatus={selectedStatus}
							onTypeChange={setSelectedType}
							onStatusChange={setSelectedStatus}
						/>

						{/* Upcoming Events */}
						{(selectedStatus === 'all' ||
							selectedStatus === 'upcoming') &&
							upcomingEvents.length > 0 && (
								<div className='mb-20'>
									<div className='flex items-center gap-3 mb-8'>
										<Sparkles className='w-6 h-6 text-blue-400' />
										<h2 className='text-2xl md:text-3xl font-bold text-white'>
											Upcoming Events
										</h2>
									</div>
									<StaggerContainer className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{upcomingEvents.map((event) => (
											<StaggerItem key={event.id}>
												<EventCard {...event} />
											</StaggerItem>
										))}
									</StaggerContainer>
								</div>
							)}

						{/* Past Events */}
						{(selectedStatus === 'all' ||
							selectedStatus === 'completed') &&
							pastEvents.length > 0 && (
								<div>
									<div className='flex items-center gap-3 mb-8'>
										<TrendingUp className='w-6 h-6 text-gray-400' />
										<h2 className='text-2xl md:text-3xl font-bold text-white'>
											Past Events
										</h2>
									</div>
									<StaggerContainer className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{pastEvents.map((event) => (
											<StaggerItem key={event.id}>
												<EventCard {...event} />
											</StaggerItem>
										))}
									</StaggerContainer>
								</div>
							)}

						{/* Empty state */}
						{filteredEvents.length === 0 && (
							<div className='text-center py-12 md:py-16 lg:py-20'>
								<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 mb-6'>
									<Calendar className='w-8 h-8 text-gray-500' />
								</div>
								<h3 className='text-xl font-semibold text-white mb-2'>
									No events found
								</h3>
								<p className='text-gray-400'>
									Try adjusting your filters or check back
									later for new events.
								</p>
							</div>
						)}
					</div>
				</section>
			</div>
		</AnimatedPage>
	);
}
