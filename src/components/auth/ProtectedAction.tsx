import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedActionProps {
	children: ReactNode;
	requireMembership?: boolean;
	onClick?: () => void;
}

export default function ProtectedAction({
	children,
	requireMembership = false,
	onClick,
}: ProtectedActionProps) {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		// Check if user is authenticated
		if (!isAuthenticated) {
			navigate('/login', { state: { from: location } });
			return;
		}

		// Check if membership is required - navigate to membership required page
		if (
			requireMembership &&
			user?.role !== 'member' &&
			user?.role !== 'admin'
		) {
			navigate('/membership-required');
			return;
		}

		// User is authenticated and has required access
		if (onClick) {
			onClick();
		}
	};

	return (
		<div
			onClick={handleClick}
			className='cursor-pointer'>
			{children}
		</div>
	);
}
