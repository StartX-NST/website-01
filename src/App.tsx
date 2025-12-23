import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/Layout/PageLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import Learn from './pages/Learn';
import Showcase from './pages/Showcase';
import Explore from './pages/Explore';
import CheckEligibility from './pages/CheckEligibility';
import Login from './pages/Login';
import MembershipRequired from './pages/MembershipRequired';
import ApplyMembership from './pages/ApplyMembership';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path='/'
							element={
								<PageLayout>
									<Home />
								</PageLayout>
							}
						/>
						<Route
							path='/events'
							element={
								<PageLayout>
									<Events />
								</PageLayout>
							}
						/>
						<Route
							path='/learn'
							element={
								<ProtectedRoute requireMembership={true}>
									<PageLayout>
										<Learn />
									</PageLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='/showcase'
							element={
								<PageLayout>
									<Showcase />
								</PageLayout>
							}
						/>
						<Route
							path='/explore'
							element={
								<PageLayout>
									<Explore />
								</PageLayout>
							}
						/>
						<Route
							path='/check-eligibility'
							element={
								<PageLayout>
									<CheckEligibility />
								</PageLayout>
							}
						/>
						<Route
							path='/login'
							element={
								<PageLayout>
									<Login />
								</PageLayout>
							}
						/>
						<Route
							path='/membership-required'
							element={
								<PageLayout>
									<MembershipRequired />
								</PageLayout>
							}
						/>
						<Route
							path='/apply-membership'
							element={
								<ProtectedRoute>
									<PageLayout>
										<ApplyMembership />
									</PageLayout>
								</ProtectedRoute>
							}
						/>
						<Route
							path='*'
							element={<NotFound />}
						/>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
