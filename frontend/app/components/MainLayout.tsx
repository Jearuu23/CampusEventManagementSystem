import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useAuth } from "~/contexts/auth/AuthContext";
import { UserRole } from "~/types/user";

export default function MainLayout() {
	const { userRole } = useAuth();
	const isDashboardUser = userRole === UserRole.ADMIN || userRole === UserRole.ORGANIZER;

	if (isDashboardUser) {
		return (
			<div className="flex h-screen overflow-hidden bg-background font-sans text-text-primary">
				<Sidebar />
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		);
	}

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
