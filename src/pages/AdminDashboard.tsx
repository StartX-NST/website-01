import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Users, Trophy, Heart, Calendar } from 'lucide-react';
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

type ActiveTab =
	| 'showcase'
	| 'opportunities'
	| 'events'
	| 'applications'
	| 'interests';

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
	];

	return (
		<AnimatedPage>
			<div className='min-h-screen bg-black pt-32 pb-20 px-6'>
				<div className='max-w-7xl mx-auto'>
					<StaggerContainer>
						{/* Header */}
						<StaggerItem>
							<div className='text-center mb-12'>
								<h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
									Admin Dashboard
								</h1>
								<p className='text-gray-400 text-lg'>
									Manage showcase projects and membership
									applications
								</p>
							</div>
						</StaggerItem>

						{/* Tab Navigation */}
						<StaggerItem>
							<div className='flex gap-4 mb-8 border-b border-gray-800'>
								{tabs.map((tab) => {
									const Icon = tab.icon;
									const isActive = activeTab === tab.id;

									return (
										<button
											key={tab.id}
											onClick={() => setActiveTab(tab.id)}
											className={`
												flex items-center gap-2 px-6 py-4 font-semibold transition-all relative
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
								{activeTab === 'events' && <AddEventForm />}
								{activeTab === 'applications' && (
									<ApplicationsManager />
								)}
								{activeTab === 'interests' && (
									<OpportunityInterestsManager />
								)}
							</div>
						</StaggerItem>
					</StaggerContainer>
				</div>
			</div>
		</AnimatedPage>
	);
}
