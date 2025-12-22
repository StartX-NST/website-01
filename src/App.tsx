import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/Layout/PageLayout';
import Home from './pages/Home';
import Events from './pages/Events';
import Learn from './pages/Learn';
import Showcase from './pages/Showcase';
import Explore from './pages/Explore';
import CheckEligibility from './pages/CheckEligibility';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
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
							<PageLayout>
								<Learn />
							</PageLayout>
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
						path='*'
						element={<NotFound />}
					/>
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
