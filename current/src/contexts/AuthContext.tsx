import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'guest' | 'user' | 'member' | 'admin';

export type ApplicationStatus =
	| 'none'
	| 'draft'
	| 'submitted'
	| 'under_review'
	| 'approved'
	| 'rejected';

export interface User {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	applicationStatus: ApplicationStatus;
	avatar?: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	updateApplicationStatus: (status: ApplicationStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	// Check for stored user on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async (email: string, _password: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Mock user data - in real app, this comes from backend
		const mockUser: User = {
			id: '1',
			name: 'Demo User',
			email,
			role: email.includes('admin')
				? 'admin'
				: email.includes('member')
				? 'member'
				: 'user',
			applicationStatus: email.includes('member') ? 'approved' : 'none',
		};

		setUser(mockUser);
		localStorage.setItem('user', JSON.stringify(mockUser));
	};

	const signup = async (name: string, email: string, _password: string) => {
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const newUser: User = {
			id: Date.now().toString(),
			name,
			email,
			role: 'user',
			applicationStatus: 'none',
		};

		setUser(newUser);
		localStorage.setItem('user', JSON.stringify(newUser));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	const updateApplicationStatus = (status: ApplicationStatus) => {
		if (user) {
			const updatedUser = { ...user, applicationStatus: status };
			setUser(updatedUser);
			localStorage.setItem('user', JSON.stringify(updatedUser));
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				login,
				signup,
				logout,
				updateApplicationStatus,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
