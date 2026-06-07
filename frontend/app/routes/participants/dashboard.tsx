import type { Route } from "../+types/dashboardParticipant";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as DashboardPage } from "~/pages/participant/dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
	return [{ title: "Participant Dashboard" }, { name: "description", content: "Organizer Dashboard" }];
}

export default function EventManagement() {
	return (
		<RouteHandler role={UserRole.PARTICIPANT}>
			<DashboardPage />
		</RouteHandler>
	);
}
