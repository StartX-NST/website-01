import { useState, useEffect } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import {
	LayoutGrid,
	Users,
	Trophy,
	Heart,
	Calendar,
	ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
	AnimatedPage,
	StaggerContainer,
	StaggerItem,
} from '@/components/animations';
import AddShowcaseForm from '@/components/admin/AddShowcaseForm';
import AddOpportunityForm from '@/components/admin/AddOpportunityForm';
import AddEventForm from '@/components/admin/AddEventForm';
import ApplicationsManager from '@/components/admin/ApplicationsManager';
import OpportunityInterestsManager from '@/components/admin/OpportunityInterestsManager';
import EventInterestsManager from '@/components/admin/EventInterestsManager';

type ActiveTab =
	| 'showcase'
	| 'opportunities'
	| 'events'
	| 'applications'
	| 'interests'
	| 'eventInterests';

export default function AdminDashboard() {
	const { user } = useAuth();
	const location = useLocation();
	const [activeTab, setActiveTab] = useState<ActiveTab>('showcase');
	const [editData, setEditData] = useState<any>(null);

	useEffect(() => {
		if (location.state?.editOpportunity) {
			setActiveTab('opportunities');
			setEditData(location.state.editOpportunity);
		} else if (location.state?.editShowcase) {
			setActiveTab('showcase');
			setEditData(location.state.editShowcase);
		} else if (location.state?.editEvent) {
			setActiveTab('events');
			setEditData(location.state.editEvent);
		}
	}, [location.state]);

	// Redirect if not admin
	if (!user || user.role !== 'admin') {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	const tabs = [
		{
			id: 'showcase' as ActiveTab,
			label: 'Add Showcase Project',
			icon: LayoutGrid,
		},
		{
			id: 'opportunities' as ActiveTab,
			label: 'Add Opportunity',
			icon: Trophy,
		},
		{
			id: 'events' as ActiveTab,
			label: 'Add Event',
			icon: Calendar,
		},
		{
			id: 'applications' as ActiveTab,
			label: 'Membership Applications',
			icon: Users,
		},
		{
			id: 'interests' as ActiveTab,
			label: 'Opportunity Interests',
			icon: Heart,
		},
		{
			id: 'eventInterests' as ActiveTab,
			label: 'Event Interests',
			icon: Calendar,
		},
	];

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black pt-32 pb-20 px-6'>
				<div className='max-w-7xl mx-auto'>
					<StaggerContainer>
						{/* Header */}
						<StaggerItem>
							<div className='relative mb-12'>
								{/* Back Button */}
								<Link
									to='/'
									className='absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group'>
									<ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 transition-transform' />
									<span className='text-sm font-medium'>
										Back
									</span>
								</Link>

								{/* Title */}
								<div className='text-center'>
									<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
										Admin Dashboard
									</h1>
									<p className='text-gray-400 text-lg'>
										Manage showcase projects, opportunities,
										events, membership applications, and
										interests
									</p>
								</div>
							</div>
						</StaggerItem>

						{/* Tab Navigation */}
						<StaggerItem>
							<div className='flex gap-4 mb-8 border-b border-gray-800 overflow-x-auto scrollbar-hide'>
								{tabs.map((tab) => {
									const Icon = tab.icon;
									const isActive = activeTab === tab.id;

									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`
												flex items-center gap-2 px-6 py-4 font-semibold transition-all relative whitespace-nowrap
												${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}
											`}>
											<Icon className='w-5 h-5' />
											<span>{tab.label}</span>
											{isActive && (
												<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400' />
											)}
										</button>
									);
								})}
							</div>
						</StaggerItem>

						{/* Content */}
						<StaggerItem>
							<div className='bg-black/40 border border-gray-800 rounded-xl p-8 backdrop-blur-sm'>
								{activeTab === 'showcase' && (
									<AddShowcaseForm editData={editData} />
								)}
								{activeTab === 'opportunities' && (
									<AddOpportunityForm editData={editData} />
								)}
								{activeTab === 'events' && (
									<AddEventForm editData={editData} />
								)}
								{activeTab === 'applications' && (
									<ApplicationsManager />
								)}
								{activeTab === 'interests' && (
									<OpportunityInterestsManager />
								)}
								{activeTab === 'eventInterests' && (
									<EventInterestsManager />
								)}
							</div>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</div>
		</AnimatedPage>
	);
}
