import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { UserRole, type User } from "~/types/user";
import { CheckAuth, LogoutUser } from "~/api/user";

interface AuthContextType {
	user: User | null;
	setUser: (user: User | null) => void;
	userRole: UserRole;
	setUserRole: (role: UserRole) => void;
	login: (user: User) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifySession = async () => {
			try {
				const data = await CheckAuth();
				if (data.success && data.user) {
					setUserRole(data.user.role as UserRole);
					setUser(data.user);
				}
			} catch (error) {
				console.error("Failed to verify session:", error);
			} finally {
				setLoading(false);
			}
		};

		verifySession();
	}, []);

	const login = (userData: User) => {
		setUserRole(userData.role as UserRole);
		setUser(userData);
		console.log("User logged in:", userData);
	};

	const logout = async () => {
		try {
			await LogoutUser();
		} catch (error) {
			console.error("Logout failed:", error);
		}
		setUserRole(UserRole.USER);
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, setUser, userRole, setUserRole, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
