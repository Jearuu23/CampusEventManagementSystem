import type { Route } from "../+types/dashboardOrganizer";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as DashboardPage } from "~/pages/organizer/dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Organizer Dashboard" }, { name: "description", content: "Organizer Dashboard" }];
}

export default function EventManagement() {
	return (
		<RouteHandler role={UserRole.ORGANIZER}>
			<DashboardPage />
		</RouteHandler>
	);
}
