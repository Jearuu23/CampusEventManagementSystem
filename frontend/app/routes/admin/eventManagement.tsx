import type { Route } from "../+types/adminDashboard";
import RouteHandler from "../RouteHandler";
import { UserRole } from "~/types/user";
import { default as EventManagementPage } from "~/pages/admin/eventManagement/EventManagement";
import { APPNAME } from "~/constants";

export function meta({}: Route.MetaArgs) {
	return [{ title: `Admin Dashboard | ${APPNAME}` }, { name: "description", content: "Welcome to React Router!" }];
}

export default function EventManagement() {
	return (
		<RouteHandler role={UserRole.ADMIN}>
			<EventManagementPage />
		</RouteHandler>
	);
}
