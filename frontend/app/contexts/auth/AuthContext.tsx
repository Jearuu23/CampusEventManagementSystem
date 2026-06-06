import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { UserRole } from "~/types/user";
import { CheckAuth, LogoutUser } from "~/api/user";

interface AuthContextType {
	userRole: UserRole;
	setUserRole: (role: UserRole) => void;
	login: (role: UserRole) => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifySession = async () => {
			try {
				const data = await CheckAuth();
				if (data.success && data.user) {
					setUserRole(data.user.role as UserRole);
				}
			} catch (error) {
				console.error("Failed to verify session:", error);
			} finally {
				setLoading(false);
			}
		};

		verifySession();
	}, []);

	const login = (role: UserRole) => {
		setUserRole(role);
	};

	const logout = async () => {
		try {
			await LogoutUser();
		} catch (error) {
			console.error("Logout failed:", error);
		}
		setUserRole(UserRole.USER);
	};

	return <AuthContext.Provider value={{ userRole, setUserRole, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
