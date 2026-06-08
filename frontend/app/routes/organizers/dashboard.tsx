import type { Route } from "../+types/dashboardOrganizer";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as DashboardPage } from "~/pages/organizer/dashboard/Dashboard";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Organizer Dashboard | ${APPNAME}` }, { name: "description", content: "Organizer Dashboard" }];
}

export default function EventManagement() {
	return (
		<RouteHandler role={UserRole.ORGANIZER}>
			<DashboardPage />
		</RouteHandler>
	);
}
