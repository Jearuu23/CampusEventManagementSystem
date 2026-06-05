import { createContext, useContext, useState, type ReactNode } from "react";
import { UserRole } from "~/types/user";

interface AuthContextType {
	userRole: UserRole;
	setUserRole: (role: UserRole) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [userRole, setUserRole] = useState<UserRole>(UserRole.USER);

	const logout = () => {
		setUserRole(UserRole.USER);
	};

	return <AuthContext.Provider value={{ userRole, setUserRole, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
