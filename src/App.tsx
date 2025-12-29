import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Cursor } from '@/components/ui/inverted-cursor';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import Learn from '@/pages/Learn';
import Showcase from '@/pages/Showcase';
import Explore from '@/pages/Explore';
import CheckEligibility from '@/pages/CheckEligibility';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import MembershipApplication from '@/pages/MembershipApplication';
import MembershipRequired from '@/pages/MembershipRequired';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				{/* Universal custom cursor */}
				<Cursor size={60} />

				<Routes>
					{/* Auth routes without layout */}
					<Route
						path='login'
						element={<Login />}
					/>
					<Route
						path='signup'
						element={<Signup />}
					/>
					<Route
						path='membership-required'
						element={<MembershipRequired />}
					/>
					<Route
						path='apply-membership'
						element={<MembershipApplication />}
					/>{' '}
					{/* Main app routes with layout */}
					<Route
						path='/'
						element={<Layout />}>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path='events'
							element={<Events />}
						/>
						<Route
							path='learn'
							element={<Learn />}
						/>
						<Route
							path='showcase'
							element={<Showcase />}
						/>
						<Route
							path='explore'
							element={<Explore />}
						/>
						<Route
							path='check-eligibility'
							element={<CheckEligibility />}
						/>
						{/* Placeholder routes for header navigation */}
						<Route
							path='resources'
							element={<Explore />}
						/>
						<Route
							path='features'
							element={<Explore />}
						/>
						<Route
							path='community'
							element={<Explore />}
						/>
						<Route
							path='pricing'
							element={<Explore />}
						/>
						<Route
							path='login'
							element={<CheckEligibility />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
