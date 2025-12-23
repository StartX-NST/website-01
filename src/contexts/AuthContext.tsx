import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface User {
	id: string;
	email: string;
	name: string;
	isMember: boolean;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	isMember: boolean;
	login: (userData: User) => void;
	logout: () => void;
	updateMembershipStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	// Load user from localStorage on mount
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (userData: User) => {
		setUser(userData);
		localStorage.setItem('user', JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	const updateMembershipStatus = (status: boolean) => {
		if (user) {
			const updatedUser = { ...user, isMember: status };
			setUser(updatedUser);
			localStorage.setItem('user', JSON.stringify(updatedUser));
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isMember: user?.isMember || false,
				login,
				logout,
				updateMembershipStatus,
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
