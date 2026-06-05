import React, { useEffect } from "react";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

interface RouteHandlerProps {
	children: React.ReactNode;
	role: UserRole;
}

export default function RouteHandler({ children, role }: RouteHandlerProps) {
	const { userRole } = useAuth();

	useEffect(() => {
		if (userRole !== role) {
			window.location.href = "/";
		}
	}, [userRole, role]);

	return userRole === role ? children : null;
}
