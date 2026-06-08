import type { Route } from "../+types/home";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as AdminDashboardPage } from "~/pages/admin/dashboard/Dashboard";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Admin Dashboard | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function AdminDashboard() {
	return (
		<RouteHandler role={UserRole.ADMIN}>
			<AdminDashboardPage />
		</RouteHandler>
	);
}
