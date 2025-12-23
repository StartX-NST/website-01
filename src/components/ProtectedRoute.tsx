import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
	children: ReactNode;
	requireMembership?: boolean;
}

export function ProtectedRoute({
	children,
	requireMembership = false,
}: ProtectedRouteProps) {
	const { isAuthenticated, isMember } = useAuth();

	// If route requires authentication and user is not authenticated
	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}

	// If route requires membership and user is not a member
	if (requireMembership && !isMember) {
		return (
			<Navigate
				to='/membership-required'
				replace
			/>
		);
	}

	return <>{children}</>;
}
