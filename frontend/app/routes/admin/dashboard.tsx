import type { Route } from "../+types/home";
import { AdminRoute } from "./AdminRoute";
import { default as AdminDashboardPage } from "~/pages/admin/dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Admin Dashboard" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function AdminDashboard() {
	return (
		<AdminRoute>
			<AdminDashboardPage />
		</AdminRoute>
	);
}
