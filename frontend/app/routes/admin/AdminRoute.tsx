import React, { useEffect } from "react";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

interface AdminRouteProps {
	children: React.ReactNode;
	role: UserRole;
}

const AdminRoute = ({ children, role }: AdminRouteProps) => {
	const { userRole } = useAuth();

	useEffect(() => {
		if (userRole !== role) {
			// Redirect to a different page if the user is not authorized
			window.location.href = "/";
		}
	}, [userRole, role]);

	return userRole === role ? children : null;
};

export default AdminRoute;
