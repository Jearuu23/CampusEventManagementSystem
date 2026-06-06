import React, { useEffect } from "react";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

interface RouteHandlerProps {
	children: React.ReactNode;
	role: UserRole;
}

export default function RouteHandler({ children, role }: RouteHandlerProps) {
	const { userRole, loading } = useAuth();

	useEffect(() => {
		if (!loading && userRole !== role) {
			window.location.href = "/";
		}
	}, [userRole, role, loading]);

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center bg-background text-text-primary fade-in-element">
				<div className="font-mono text-[11px] tracking-[0.2em] uppercase">Verifying Session...</div>
			</div>
		);
	}

	return userRole === role ? children : null;
}
